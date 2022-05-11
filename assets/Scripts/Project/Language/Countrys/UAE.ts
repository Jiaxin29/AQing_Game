import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UAE extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Stcpay  // 支付方式

    public CountryName = 'UAE'
    public GameName = null
    // public SecondName = 'تثبيت للحصول على 300 درهم'
    public Icon = 'Icon/indo'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'تحميل'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 100, 200, 300], symbol: 'AED'}
}
