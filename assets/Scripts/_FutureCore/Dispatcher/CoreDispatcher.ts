/*
    aoemo.com
*/

import { Dispatcher } from "./Dispatcher";

export class CoreDispatcher extends Dispatcher<number>
{
    private static m_Me: CoreDispatcher;

    constructor()
    {
        super();
    }

    public static get Me(): CoreDispatcher
    {
        if (this.m_Me == null)
            this.m_Me = new CoreDispatcher();
        return this.m_Me;
    }
}