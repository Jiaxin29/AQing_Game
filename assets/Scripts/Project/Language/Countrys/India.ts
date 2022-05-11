import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class India extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'india'
    public GameName = null
    // public SecondName = ''
    public Icon = 'Icon/india'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'डाउनलोड'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 3000, 6000, 9000], symbol: '₹'}
    public reverseMoneyTag = true
}
