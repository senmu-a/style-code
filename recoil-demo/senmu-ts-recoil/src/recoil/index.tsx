
import { useState, useEffect, useCallback } from 'react';
interface IDissconnect {
  disconnect: () => void
}

class Stateful<T> {
  constructor(protected value: T) {}
  
  private listeners = new Set<(value: T) => void>();

  public subscribe(callback: (value: T) => void): IDissconnect {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      }
    }
  }

  public snapshot(): T {
    return this.value;
  }

  public emit() {
    console.log('[状态更新]', Math.random());
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  // 派生类可以访问
  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }

}

class Atom<T> extends Stateful<T> {
  public setState(value: T): void {
    super.update(value);
  }
}

//   ({get}) => {
//     const text = get(textState);
//     return text.length;
//   }
class Selector<T> extends Stateful<T> {
  constructor(private readonly generator: TSelectorGenerator<T>) {
    super(undefined as any);
    this.value = generator({ get: (dep: Atom<any>) => this.addSub(dep)})
  }

  // 维护的是 Atom 的变化
  private registerListener = new Set<Atom<any>>();
  private addSub(dep: Atom<any>) {
    if (!this.registerListener.has(dep)) {
      dep.subscribe(() => this.updateSelector());
      this.registerListener.add(dep);
    }
    return dep.snapshot();
  }

  private updateSelector() {
    this.update(this.generator({ get: (dep: Atom<any>) => this.addSub(dep)}));
  }
}

function tuplify<T extends unknown[]>(...args: T) {
  return args;
}

// 基础状态
// {
//   key: 'textState',
//   default: '', 
// }
export function atom<V>(value: {
  key: string, 
  default: V
}) {
  return new Atom(value.default);
}

type TSelectorGenerator<V> = (context: { get: <T>(dep: Atom<T>) => T }) => V;

// {
//   key: 'charCountState',
//   get: ({get}) => {
//     const text = get(textState);
//     return text.length;
//   },
// }
// 相当于 Action
export function selector<V>(value: {
  key: string;
  get: TSelectorGenerator<V>
}) {
  return new Selector(value.get)
}

// 可以改变基础状态
export function useRecoilState<T>(atom: Atom<T>) {
  const value = useRecoilValue(atom);

  return tuplify(value, useCallback((value: T) => atom.setState(value), [atom]));
}

// 获取基本状态不改变 基础状态变化更新（双向）
export function useRecoilValue<T>(value: Stateful<T>) {
  // react 组件更新
  const [_, updateState] = useState({});

  useEffect(() => {
    const { disconnect } = value.subscribe(() => {
      updateState({})
    });
    
    return () => disconnect();
  }, [value]);

  return value.snapshot();
}

/**
 * 1. useRecoilValue 订阅了一个状态（如果变化了，页面得变，内存中的数据也得变）
 * 2. 在数据变化之前，订阅了 value.subscribe(() => updateState({}));
 * 3. useRecoilValue 进行更新，触发了楼上，页面就变了
 * 4. useRecoilState 吐出的 setState（atom 子类执行了一个方法更新调用了父类的更新 内存 接下来触发了3楼）
 * 
 */
