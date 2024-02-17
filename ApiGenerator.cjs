require('ts-node').register()
/**
 * @type {import('openapi-typescript').default}
 */
const openapiTS = require('openapi-typescript')
const prettier = require('prettier')
const fs = require('node:fs')
const ts = require('typescript')
const { OPENAPI_URL } = require('./src/common/constants')

class ApiGenerator {
  /**
   * @type {string}
   */
  openapiUrl

  /**
   * @type {string}
   */
  apiFolder

  /**
   * @type {ts.sourceFile}
   */
  sourceFile

  /**
   * @type {import('prettier').Options}
   */
  prettierOptions = {
    parser: 'typescript',
    singleQuote: true,
    jsxSingleQuote: true,
    semi: false,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'avoid',
    printWidth: 80,
    jsxBracketSameLine: false,
    trailingComma: 'none'
  }

  /**
   * Constructor
   * @param {{
   *   openapiUrl: string,
   *   apiFolder: string,
   *   prettierOptions?: import('prettier').Options
   * }} param0
   */
  constructor({ openapiUrl, apiFolder, prettierOptions }) {
    this.apiFolder = apiFolder
    this.openapiUrl = openapiUrl
    if (prettierOptions) {
      this.prettierOptions = prettierOptions
    }
  }

  /**
   * Generate typescript schemas from openapi
   */
  async generateSchemas() {
    /**
     * @type {string}
     */
    const schemas = await openapiTS(this.openapiUrl)
    const code = await prettier.format(schemas, this.prettierOptions)
    const path = `${this.apiFolder}/schemas.d.ts`
    fs.mkdirSync(this.apiFolder, { recursive: true })
    fs.writeFileSync(path, code)
    this.sourceFile = ts.createSourceFile(path, code, ts.ScriptTarget.Latest)
    return code
  }

  /**
   * Get methods
   * @param {ts.PropertySignature} node
   * @returns {[string, { httpOperation: string, methodName: string }[]] as const}
   */
  getMethods(node) {
    const path = node.name.text
    const methods = []
    node.type.members.forEach(member => {
      if (!ts.isPropertySignature(member)) {
        return
      }
      const httpOperation = member.name.text.toUpperCase()
      const methodName = member.type.indexType.literal.text
      methods.push({ httpOperation, methodName })
    })
    return [path, methods]
  }

  /**
   * Get APIs
   * @returns {{[key: string]: {path: string, methods: {httpOperation: string, methodName: string}[]}[]}}
   */
  getApiDict() {
    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.sourceFile
    /**
     * @type {ts.InterfaceDeclaration}
     */
    let node
    sourcefile.forEachChild(n => {
      if (ts.isInterfaceDeclaration(n) && n.name.text === 'paths') {
        node = n
      }
    })
    /**
     * @type {ts.PropertySignature[]}
     */
    let pathObjs = []
    node.members.forEach(member => {
      if (ts.isPropertySignature(member)) {
        pathObjs.push(member)
      }
    })
    pathObjs.sort((a, b) => a.name.text.localeCompare(b.name.text))
    return pathObjs.reduce((acc, pathObj) => {
      const pathName = pathObj.name.text
      let baseName = pathName.split('/')[1] + 'Api'
      baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1)
      const [path, methods] = this.getMethods(pathObj)
      return {
        ...acc,
        [baseName]: [...(acc[baseName] || []), { path, methods }]
      }
    }, {})
  }

  /**
   *
   * @param {string} schemaName
   */
  getSchema(schemaName) {
    /**
     * @type {string[]}
     */
    const res = []
    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.sourceFile
    sourcefile.forEachChild(node => {
      if (!ts.isInterfaceDeclaration(node) || node.name.text !== 'components') {
        return
      }
      node.forEachChild(c => {
        if (!ts.isPropertySignature(c) || c.name.text !== 'schemas') {
          return
        }
        c.type?.forEachChild(s => {
          if (!ts.isPropertySignature(s) || s.name.text !== schemaName) {
            return
          }
          s.type.forEachChild(prop => {
            if (!ts.isPropertySignature(prop) || !ts.isIdentifier(prop.name)) {
              return
            }
            res.push(prop.name.text)
          })
        })
      })
    })
    return res
  }

  /**
   * Get parameters of a operation
   * @param {string} operationName
   * @returns {[{query: string[], path: string[], body: string[]}, boolean] as const}
   */
  getParamsAndCheckReturn(operationName) {
    /**
     * @type {{query: string[], path: string[], body: string[]}}
     */
    const res = {
      query: [],
      path: [],
      body: []
    }

    let noreturn = false

    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.sourceFile

    sourcefile.forEachChild(node => {
      if (!ts.isInterfaceDeclaration(node) || node.name.text !== 'operations') {
        return
      }
      node.forEachChild(child => {
        if (
          !ts.isPropertySignature(child) ||
          child.name.text !== operationName
        ) {
          return
        }
        child.forEachChild(c => {
          if (!ts.isTypeLiteralNode(c)) {
            return
          }
          c.forEachChild(p => {
            if (!ts.isPropertySignature(p) || !ts.isIdentifier(p.name)) {
              return
            }
            if (p.name.text === 'parameters') {
              p.forEachChild(param => {
                if (!ts.isTypeLiteralNode(param)) {
                  return
                }
                param.forEachChild(pp => {
                  if (
                    !ts.isPropertySignature(pp) ||
                    !ts.isIdentifier(pp.name)
                  ) {
                    return
                  }
                  switch (pp.name.text) {
                    case 'query':
                      pp.type.forEachChild(q => {
                        if (!ts.isPropertySignature(q)) {
                          return
                        }
                        res.query.push(q.name.text)
                      })
                      break
                    case 'path':
                      pp.type.forEachChild(q => {
                        if (!ts.isPropertySignature(q)) {
                          return
                        }
                        res.path.push(q.name.text)
                      })
                      break
                    default:
                      console.warn('Unknown parameter type', pp.name.text)
                  }
                })
              })
            } else if (p.name.text === 'requestBody') {
              p.forEachChild(body => {
                if (!ts.isTypeLiteralNode(body)) {
                  return
                }
                body.forEachChild(b => {
                  if (!ts.isPropertySignature(b) || b.name.text !== 'content') {
                    return
                  }
                  b.type.forEachChild(content => {
                    if (
                      !ts.isPropertySignature(content) ||
                      !ts.isStringLiteral(content.name) ||
                      content.name.text.split('/').length !== 2 ||
                      !ts.isIndexedAccessTypeNode(content.type)
                    ) {
                      return
                    }
                    content.type?.indexType?.forEachChild(it => {
                      if (!ts.isStringLiteral(it)) {
                        return
                      }
                      res.body = this.getSchema(it.text)
                    })
                  })
                })
              })
            } else if (p.name.text === 'responses') {
              p.type?.forEachChild(response => {
                if (
                  !ts.isPropertySignature(response) ||
                  response.name.text !== '200'
                ) {
                  return
                }
                response.type?.forEachChild(responseType => {
                  if (
                    !ts.isPropertySignature(responseType) ||
                    responseType.name.text !== 'content'
                  ) {
                    return
                  }
                  if (responseType?.type.kind === ts.SyntaxKind.NeverKeyword) {
                    noreturn = true
                  }
                })
              })
            }
          })
        })
      })
    })

    return [res, noreturn]
  }

  /**
   * Generate method code
   * @param {string} methodName
   * @param {string} path
   * @param {string} httpOperation
   * @param {{query: string[], path: string[], body: string[]}} params
   * @param {boolean} noreturn
   */
  generateMethodCode(methodName, path, httpOperation, params, noreturn) {
    if (methodName === 'delete') {
      methodName = '$delete'
    }

    const hasParams =
      params.query.length + params.path.length + params.body.length > 0

    const mapper = q => `${q}: params.${q}`

    /**
     * Seprate parameters by comma
     * @param {any[]} p
     */
    const sep = p => p.map(mapper).join(', ')

    const paramsLiteral = hasParams ? 'params' : ''

    const getResReturnKeyWord = noreturn ? '' : 'return '

    const getDataReturnStatement = noreturn ? '' : 'return res.data.data'

    const resAssignment = noreturn ? '' : 'const res = '

    const getResParams = `${
      hasParams
        ? `{${params.query.length > 0 ? `query: {${sep(params.query)}},` : ''}
            ${params.path.length > 0 ? `path: {${sep(params.path)}},` : ''}
            ${params.body.length > 0 ? `body: {${sep(params.body)}},` : ''}}`
        : ''
    }`

    // TODO: path parameters
    const url = `\`${
      path +
      (httpOperation !== 'GET' && params.query.length > 0
        ? '?' + params.query.map(q => `${q}=\${params.query.${q}}`).join('&')
        : '')
    }\``

    const dataStatement = `${
      hasParams && httpOperation === 'GET' && params.query.length > 0
        ? 'data: params.query'
        : params.body.length > 0
          ? 'data: params.body'
          : ''
    }`

    const code = `
    const ${methodName}: Api<'${path}', '${httpOperation}'> = {
      async getRes(${paramsLiteral}) {
        ${getResReturnKeyWord}Taro.request({
          url: ${url},
          method: '${httpOperation}',
          ${dataStatement}
        })
      },
      async getData(${paramsLiteral}) {
        ${resAssignment}await ${methodName}.getRes(${getResParams})
        ${getDataReturnStatement}
      }
    }`

    return code
  }

  /**
   *
   * @param {string} apiName
   * @param {string[]} methodNames
   * @param {string} methodCode
   */
  async generateFile(apiName, methodNames, methodCode) {
    methodNames = methodNames.map(name =>
      name === 'delete' ? '$delete' : name
    )

    const code = `
    import Taro from '@tarojs/taro'
    import { Api } from '@/types/api'
    ${methodCode}

    const ${apiName} = {
      ${methodNames.map(name => `${name}: ${name}.getData`).join(',\n')}
    }

    export default ${apiName}
    `

    const prettierCode = await prettier.format(code, this.prettierOptions)

    fs.mkdirSync(`${this.apiFolder}/autogenerated`, { recursive: true })
    fs.writeFileSync(
      `${this.apiFolder}/autogenerated/${apiName}.ts`,
      prettierCode
    )
  }

  async generateIndex() {
    const apis = Object.keys(this.getApiDict())

    const code = `
    ${apis.map(api => `import ${api} from './autogenerated/${api}'`).join('\n')}

    export { ${apis.join(',')} }
    `

    const prettierCode = await prettier.format(code, this.prettierOptions)

    fs.writeFileSync('./src/api/index.ts', prettierCode)
  }

  /**
   * Generate api
   */
  async generateApi() {
    await this.generateSchemas()
    const apiDict = this.getApiDict()
    Object.entries(apiDict).forEach(async ([apiName, apis]) => {
      const code = apis
        .map(({ path, methods }) =>
          methods
            .map(({ httpOperation, methodName }) => {
              const [params, noreturn] =
                this.getParamsAndCheckReturn(methodName)
              return this.generateMethodCode(
                methodName,
                path,
                httpOperation,
                params,
                noreturn
              )
            })
            .join('\n')
        )
        .join('\n')
      const apiMethods = apis.flatMap(({ methods }) =>
        methods.map(({ methodName }) => methodName)
      )
      await this.generateFile(apiName, apiMethods, code)
    })
    await this.generateIndex()
  }
}

const apiGenerator = new ApiGenerator({
  openapiUrl: OPENAPI_URL,
  apiFolder: './src/api'
})
apiGenerator.generateApi()
