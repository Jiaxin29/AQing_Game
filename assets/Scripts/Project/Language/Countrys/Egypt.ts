import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Egypt extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Stcpay  // 支付方式

    public CountryName = 'Egypt'
    public GameName = null
    // public SecondName = 'قم بالتثبيت لتحصل على 300 ريال'
    public Icon = 'Icon/indo'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'تحميل'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 244, 673, 1414], symbol: 'EGP'}
}
