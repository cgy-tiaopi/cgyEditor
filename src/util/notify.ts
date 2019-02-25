

class Notify {

    // 消息中心
    static eventCenter: any  = {

    }

    // 消息中心添加事件
    add(eventName: string | symbol, callback: Function) {
        let center = Notify.eventCenter;

        if (center[eventName]) {
            center[eventName].push(callback);
        } else {
            center[eventName] = [];
            center[eventName].push(callback);
        }
    }

    // 触发消息事件
    trigger(...args: any[]) {
        let center = Notify.eventCenter,
            key: string = Array.prototype.shift.call(arguments),
            callbacks = center[key];

        for (let callback of callbacks) {
            callback.apply(this, arguments);
        }
    }

    // 取消消息订阅
    del(eventName: string | symbol) {
        let center = Notify.eventCenter;

        center[eventName] = [];
    }

    // 清空消息队列
    clear() {
        Notify.eventCenter = {};
    }
}

export let notify = new Notify();