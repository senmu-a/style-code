/**
 * 依赖注入原理实现
 * 面向切面编程 AOP
 *  1. 依赖注入
 *  2. 控制反转
 */
import { Parser } from 'acorn';
import { simple } from 'acorn-walk';

interface IIndexService {
  log(str: string): void;
}

class IndexService implements IIndexService {
  log(str: string): void {
    console.log(str);
  }
}

// IOC 容器
class Container {
  public container: Map<symbol, { callback: Function }>;

  constructor() {
    this.container = new Map();
  }

  get(namespace: symbol) {
    const item = this.container.get(namespace);
    if (item) {
      return item.callback();
    } else {
      throw new Error('namespace not found');
    }
  }

  bind(namespace: symbol, callback: Function) {
    this.container.set(namespace, { callback });
  }
}

// 别名
const ALIAS = {
  'indexService': Symbol('indexService'),
}

const container = new Container();
container.bind(ALIAS.indexService, () => new IndexService());

// 使用 ast 解析类的构造函数的参数
function extractConstructorParams(classCode:  any) {
  const ast = Parser.parse(classCode.toString(), {
    ecmaVersion: 2022,
    sourceType: 'module',
  });
  // console.log('ast', ast);
  const constructorParams: string[] = [];
  simple(ast, {
    MethodDefinition(node) {
      // console.log('MethodDefinition', node);
      if (node.kind === 'constructor') {
        node.value.params.forEach((param: any) => {
          if (param.type === 'Identifier') {
            constructorParams.push(param.name);
          } else if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
            constructorParams.push(param.left.name);
          }
        });
      }
    }
  });
  return constructorParams;
}

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}

function Controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      console.log('constructor', constructor);
      const _params = extractConstructorParams(constructor);
      // console.log('_params', _params);
      super(args);
      for (let identifier of _params) {
        console.log('identifier', identifier);
        if (hasKey(this, identifier)) {
          this[identifier] = container.get(ALIAS[identifier as keyof typeof ALIAS]);
        }
      }
    }
  }
}

@Controller
class IndexController {
  private indexService: IIndexService;

  constructor(indexService?: IIndexService) {
    this.indexService = indexService;
  }

  log(): void {
    this.indexService.log('senmu 🌼' + Math.random());
  }
}

// const indexService = new IndexService();
// const indexController = new IndexController(indexService);
// indexController.log();

// IOC 解决的问题
const index = new IndexController();
index.log();
