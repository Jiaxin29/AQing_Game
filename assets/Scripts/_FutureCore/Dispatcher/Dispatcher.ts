/*
    aoemo.com
*/

export abstract class Dispatcher<Msg>
{
    private msgPriorityDict_Id: number = 0;
    private msgDict_Id: number = 0;
    private msgFinallyDict_Id: number = 0;
    private msgOnceDict_Id: number = 0;

    private m_msgPriorityDict: Map<Msg, Map<number, PatcherData>>;
    private m_msgDict: Map<Msg, Map<number, PatcherData>>;
    private m_msgFinallyDict: Map<Msg, Map<number, PatcherData>>;
    private m_msgOnceDict: Map<Msg, Map<number, PatcherData>>;

    constructor() {
        this.m_msgPriorityDict = new Map<Msg, Map<number, PatcherData>>();
        this.m_msgDict = new Map<Msg, Map<number, PatcherData>>();
        this.m_msgFinallyDict = new Map<Msg, Map<number, PatcherData>>();
        this.m_msgOnceDict = new Map<Msg, Map<number, PatcherData>>();
    }

    public AddPriorityListener(msgId: Msg, listener: Function, inst: any): Function {
        if (!this.m_msgPriorityDict.has(msgId)) {
            this.m_msgPriorityDict.set(msgId, new Map<number, PatcherData>());
        }
        var _map: Map<number, PatcherData> = this.m_msgPriorityDict.get(msgId);
        _map.set(this.msgPriorityDict_Id++, new PatcherData(listener, inst));
        return listener;
    }

    public AddListener(msgId: Msg, listener: Function, inst: any): Function {
        if (!this.m_msgDict.has(msgId)) {
            this.m_msgDict.set(msgId, new Map<number, PatcherData>());
        }
        var _map: Map<number, PatcherData> = this.m_msgDict.get(msgId);
        _map.set(this.msgDict_Id++, new PatcherData(listener, inst));
        return listener;
    }

    public AddFinallyListener(msgId: Msg, listener: Function, inst: any): Function {
        if (!this.m_msgFinallyDict.has(msgId)) {
            this.m_msgFinallyDict.set(msgId, new Map<number, PatcherData>());
        }
        var _map: Map<number, PatcherData> = this.m_msgFinallyDict.get(msgId);
        _map.set(this.msgFinallyDict_Id++, new PatcherData(listener, inst));
        return listener;
    }

    public AddOnceListener(msgId: Msg, listener: Function, inst: any): Function {
        if (!this.m_msgOnceDict.has(msgId)) {
            this.m_msgOnceDict.set(msgId, new Map<number, PatcherData>());
        }
        var _map: Map<number, PatcherData> = this.m_msgOnceDict.get(msgId);
        _map.set(this.msgOnceDict_Id++, new PatcherData(listener, inst));
        return listener;
    }

    private FindFunction(actions: Map<number, PatcherData>, listener: Function, inst: any): number {
        let result: number = -1;
        actions.forEach(
            (value, key) => {
                if (value.Equals(listener, inst)) {
                    result = key;
                }
            }
        )
        return result;
    }

    public RemovePriorityListener(msgid: Msg, listener: Function, inst: any): void {
        if (this.m_msgPriorityDict.has(msgid)) {
            let _map: Map<number, PatcherData> = this.m_msgPriorityDict.get(msgid);
            let key = this.FindFunction(_map, listener, inst);
            if (key < 0)
                return;
            _map.delete(key);
        }
    }

    public RemoveListener(msgid: Msg, listener: Function, inst: any): void {
        if (this.m_msgDict.has(msgid)) {
            let _map: Map<number, PatcherData> = this.m_msgDict.get(msgid);
            let key = this.FindFunction(_map, listener, inst);
            if (key < 0)
                return;
            _map.delete(key);
        }
    }

    public RemoveFinallyListener(msgid: Msg, listener: Function, inst: any): void {
        if (this.m_msgFinallyDict.has(msgid)) {
            let _map: Map<number, PatcherData> = this.m_msgFinallyDict.get(msgid);
            let key = this.FindFunction(_map, listener, inst);
            if (key < 0)
                return;
            _map.delete(key);
        }
    }

    public RemoveOnceListener(msgid: Msg, listener: Function, inst: any): void {
        if (this.m_msgOnceDict.has(msgid)) {
            let _map: Map<number, PatcherData> = this.m_msgOnceDict.get(msgid);
            let key = this.FindFunction(_map, listener, inst);
            if (key < 0)
                return;
            _map.delete(key);
        }
    }

    public Dispatch(msgid: Msg, param?: any): void {
        this.InvokeMethods(msgid, this.m_msgPriorityDict, param);
        this.InvokeMethods(msgid, this.m_msgDict, param);
        this.InvokeMethods(msgid, this.m_msgFinallyDict, param);
        this.InvokeMethods(msgid, this.m_msgOnceDict, param);

        if (this.m_msgOnceDict.has(msgid)) {
            this.m_msgOnceDict.delete(msgid);
        }
    }

    private InvokeMethods(msgid: Msg, msgDict: Map<Msg, Map<number, PatcherData>>, param?: object): void {
        if (!msgDict.has(msgid)) return;

        var _map = msgDict.get(msgid);
        _map.forEach((value, key) => {
            value.fun.call(value.inst, param);
        });
    }

    public Clear(): void {
        this.m_msgPriorityDict.clear();
        this.m_msgDict.clear();
        this.m_msgFinallyDict.clear();
        this.m_msgOnceDict.clear();
    }
}

class PatcherData {
    public fun: Function;
    public inst: any;

    public constructor(fun: Function, inst: any) {
        this.fun = fun;
        this.inst = inst;
    }

    public Equals(fun: Function, inst: any): boolean {
        return fun == fun && inst == inst;
    }
}