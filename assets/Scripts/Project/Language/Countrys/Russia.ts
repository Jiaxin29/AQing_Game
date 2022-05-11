import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Russia extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Qiwi  // 支付方式

    public CountryName = 'Russia'
    public GameName = null
    // public SecondName = 'установите и получите 6555₽'
    public Icon = 'Icon/indo'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'установить'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 2000, 4000, 6000], symbol: '₽'}
}
