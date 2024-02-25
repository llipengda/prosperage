/**
 * @type {import('openapi-typescript').default}
 */
const openapiTS = require('openapi-typescript')
const prettier = require('prettier')
const fs = require('node:fs/promises')
const ts = require('typescript')

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
   * @type {ts.sourceFile}
   */
  #sourceFile

  #bannedNames = [
    'break',
    'case',
    'catch',
    'continue',
    'default',
    'delete',
    'do',
    'else',
    'finally',
    'for',
    'function',
    'if',
    'in',
    'instanceof',
    'new',
    'return',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with'
  ]

  #apiDTs = `import type Taro from"@tarojs/taro";import type{paths}from"./schemas";\n\ntype Expand<T>=T extends object?T extends infer O?{[K in keyof O]:Expand<O[K]>}:never:T;export type Result<T>={code:number;data:T;msg:string;};type _HTTPOperations="get"|"post"|"put"|"delete"|"patch";export type HTTPOperations=Uppercase<_HTTPOperations>;export type Paths=Expand<keyof paths>;type HTTPStatusCode=|"200"|"201"|"204"|"400"|"401"|"403"|"404"|"500";type NoneNeverKeys<T>={[P in keyof T]:T[P]extends never?never:P;}extends{[key in keyof T]:infer U}?U:never;type _Params<TPath extends Paths,TOperation extends HTTPOperations>=paths[TPath]extends{[key in Lowercase<TOperation>]:{requestBody?:{content:{"application/json"?:infer UBody1;"*/*"?:infer UBody2;};};parameters?:{query?:infer UQuery;path?:infer UPath};};}?{query:UQuery extends{[key:string]:any}?UQuery:never;path:UPath extends{[key:string]:any}?UPath:never;body:UBody1&UBody2 extends{[key:string]:any}?UBody1&UBody2:never;}:never;export type Params<TPath extends Paths,TOperation extends HTTPOperations>=NoneNeverKeys<_Params<TPath,TOperation>>extends never?never:Expand<Pick<_Params<TPath,TOperation>,NoneNeverKeys<_Params<TPath,TOperation>>>>;export type Response<TPath extends Paths,TOperation extends HTTPOperations,TCode extends HTTPStatusCode="200">=paths[TPath]extends{[key in Lowercase<TOperation>]:{responses:{[code in TCode]:{content:{"application/json"?:infer URes1;"*/*"?:infer URes2;};};};};}?URes1&URes2 extends infer R?R extends Partial<Result<infer U>>?U:never:never:never;export type Api<TPath extends Paths,TOperation extends HTTPOperations,TCode extends HTTPStatusCode="200">=[Params<TPath,TOperation>,Response<TPath,TOperation,TCode>]extends[infer P,infer R]?Taro.request.SuccessCallbackResult<Result<R>>extends infer S?[P]extends[never]?[R]extends[never]?{getRes:()=>Promise<void>;getData:()=>Promise<void>;}:{getRes:()=>Promise<S>;getData:()=>Promise<R>;}:P extends{query?:infer Q;path?:infer Pa;body?:infer B;}?[R]extends[never]?{getRes:(params:P)=>Promise<void>;getData:(params:Q&Pa&B)=>Promise<void>;}:{getRes:(params:P)=>Promise<S>;getData:(params:Q&Pa&B)=>Promise<R>;}:never:never:never;`

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
  async #generateSchemas() {
    /**
     * @type {string}
     */
    const schemas = await openapiTS(this.openapiUrl)
    const code = await prettier.format(schemas, this.prettierOptions)
    const typesFolder = `${this.apiFolder}/autogenerated/types`
    const path = `${typesFolder}/schemas.d.ts`
    await fs.mkdir(typesFolder, { recursive: true })
    await fs.writeFile(path, code)
    this.#sourceFile = ts.createSourceFile(path, code, ts.ScriptTarget.Latest)
    return code
  }

  async #generateApiDTs() {
    const code = this.#apiDTs
    const path = `${this.apiFolder}/autogenerated/types/api.d.ts`
    const prettierCode = await prettier.format(code, this.prettierOptions)
    await fs.writeFile(path, prettierCode)
  }

  /**
   * Get methods
   * @param {ts.PropertySignature} node
   * @returns {[string, { httpOperation: string, methodName: string }[]] as const}
   */
  #getMethods(node) {
    const path = node.name.text
    const methods = []
    node.type.members.forEach(member => {
      if (!ts.isPropertySignature(member)) {
        return
      }
      const httpOperation = member.name.text.toUpperCase()
      try {
        const methodName = member.type.indexType.literal.text
        methods.push({ httpOperation, methodName })
      } catch {
        console.log('Error in get methods of', path)
      }
    })
    return [path, methods]
  }

  /**
   * Get APIs
   * @returns {{[key: string]: {path: string, methods: {httpOperation: string, methodName: string}[]}[]}}
   */
  #getApiDict() {
    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.#sourceFile
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
      /** @type {string} */
      const pathName = pathObj.name.text
      let baseName =
        (pathName.split('/')[1] || pathName.replaceAll(' ', '')) + 'Api'
      baseName = baseName.charAt(0).toUpperCase() + baseName.slice(1)
      const [path, methods] = this.#getMethods(pathObj)
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
  #getSchema(schemaName) {
    /**
     * @type {string[]}
     */
    const res = []
    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.#sourceFile
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
   * @returns {[{query: string[], path: string[], body: string[]}, boolean, string?] as const} parameters, returnVoid, comment
   */
  #analysisOperation(operationName) {
    /**
     * @type {{query: string[], path: string[], body: string[]}}
     */
    const res = {
      query: [],
      path: [],
      body: []
    }

    let returnVoid = false

    /**
     * @type {string?}
     */
    let comment

    /**
     * @type {ts.SourceFile}
     */
    const sourcefile = this.#sourceFile

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
        if (child.jsDoc) {
          comment = `${child.jsDoc[0].comment}`
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
                      content.name.text.split('/').length !== 2
                    ) {
                      return
                    }
                    if (ts.isIndexedAccessTypeNode(content.type)) {
                      content.type?.indexType?.forEachChild(it => {
                        if (!ts.isStringLiteral(it)) {
                          return
                        }
                        res.body = this.#getSchema(it.text)
                      })
                    } else if (ts.isTypeLiteralNode(content.type)) {
                      /**
                       * @type {string[]}
                       */
                      const params = []
                      content.type.forEachChild(pa => {
                        if (!ts.isPropertySignature(pa)) {
                          return
                        }
                        params.push(pa.name.text)
                      })
                      res.body = params
                    }
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
                    returnVoid = true
                  }
                })
              })
            }
          })
        })
      })
    })

    return [res, returnVoid, comment]
  }

  /**
   * Generate method code
   * @param {string} methodName
   * @param {string} path
   * @param {string} httpOperation
   * @param {{query: string[], path: string[], body: string[]}} params
   * @param {boolean} returnVoid
   */
  #generateMethodCode(methodName, path, httpOperation, params, returnVoid) {
    if (this.#bannedNames.includes(methodName)) {
      methodName = '$' + methodName
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

    const getResReturnKeyWord = returnVoid ? '' : 'return '

    const getDataReturnStatement = returnVoid ? '' : 'return res.data.data'

    const resAssignment = returnVoid ? '' : 'const res = '

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
   * Generate file
   * @param {string} apiName
   * @param {string[]} methodNames
   * @param {string} methodCode
   * @param {{[methodName: string]: string}} commentMap
   */
  async #generateFile(apiName, methodNames, methodCode, commentMap) {
    const names = methodNames.map(name => {
      if (name.match(/^.+_\d+$/)) {
        let replaced = name.replace(/_\d+$/, '')
        let i = 1
        while (methodNames.find(n => n === replaced)) {
          replaced = replaced + i++
        }
        return { original: name, new: replaced }
      }
      if (this.#bannedNames.includes(name)) {
        return { original: '$' + name, new: name }
      }
      return { original: name, new: name }
    })

    const apiNameDeclarationCode = names
      .map(
        name => `${
          commentMap[name.original]
            ? `/** ${commentMap[name.original]} */\n`
            : ''
        }${name.new}: ${name.original}.getData
      `
      )
      .join(',\n')

    const code = `
    import Taro from '@tarojs/taro'
    import { Api } from './types/api'
    ${methodCode}

    const ${apiName} = {
      ${apiNameDeclarationCode}
    }

    export default ${apiName}
    `

    const prettierCode = await prettier.format(code, this.prettierOptions)

    await fs.mkdir(`${this.apiFolder}/autogenerated`, { recursive: true })
    await fs.writeFile(
      `${this.apiFolder}/autogenerated/${apiName}.ts`,
      prettierCode
    )
  }

  /**
   * Generate the index file
   */
  async #generateIndex() {
    const apis = (await fs.readdir(this.apiFolder + '/autogenerated'))
      .map(file => file.replace('.ts', ''))
      .filter(file => file !== 'index' && file !== 'types')

    const importCode = apis
      .map(api => `import ${api} from './${api}'`)
      .join('\n')

    const code = `
    ${importCode}

    export { ${apis.join(',')} }

    export type * from './types/api'
    export type * from './types/schemas'
    `

    const prettierCode = await prettier.format(code, this.prettierOptions)

    await fs.writeFile(`${this.apiFolder}/autogenerated/index.ts`, prettierCode)
  }

  /**
   * Generate api
   */
  async generateApi() {
    await this.#generateSchemas()
    await this.#generateApiDTs()
    const apiDict = this.#getApiDict()
    Object.entries(apiDict).forEach(async ([apiName, apis]) => {
      if (apis.length === 1 && apis[0].methods.length === 0) {
        return
      }
      /**
       * @type {{[methodName: string]: string}}
       */
      const commentMap = {}
      const code = apis
        .map(({ path, methods }) =>
          methods
            .map(({ httpOperation, methodName }) => {
              const [params, returnVoid, comment] =
                this.#analysisOperation(methodName)
              commentMap[methodName] = comment
              return this.#generateMethodCode(
                methodName,
                path,
                httpOperation,
                params,
                returnVoid
              )
            })
            .join('\n')
        )
        .join('\n')
      const apiMethods = apis.flatMap(({ methods }) =>
        methods.map(({ methodName }) => methodName)
      )
      await this.#generateFile(apiName, apiMethods, code, commentMap)
    })
    await this.#generateIndex()
  }
}

const apiGenerator = new ApiGenerator({
  openapiUrl: 'https://api.crazyforlove.fun/v3/api-docs/api',
  apiFolder: './src/api'
})
apiGenerator.generateApi()
