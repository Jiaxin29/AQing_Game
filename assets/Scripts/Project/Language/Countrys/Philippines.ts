import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Philippines extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Gcash  // 支付方式

    public CountryName = 'Philippines'
    public GameName = null
    // public SecondName = 'I-install upang makakuha ng 4500₱'
    public Icon = 'Icon/philippines'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'i-install'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 1000, 2000, 4000], symbol: '₱'}
}
