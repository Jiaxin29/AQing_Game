import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Thailand extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Truemoney  // 支付方式

    public CountryName = 'thailand'
    public GameName = null
    // public SecondName = 'ติดตั้งเพื่อรับ 900฿'
    public Icon = 'Icon/thai'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'ติดตั้ง'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 300, 600, 900], symbol: '฿'}
}
