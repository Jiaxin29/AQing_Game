import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class USA extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'usa'
    public GameName = null
    // public SecondName = 'Install To Get 90$'
    public Icon = 'Icon/icon'
    // public InstallBtn = {bg: 'language/install/usa'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 30, 60, 90], symbol: '$'}
}
