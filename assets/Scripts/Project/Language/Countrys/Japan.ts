import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Japan extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypay  // 支付方式

    public CountryName = 'japan'
    public GameName = null
    // public SecondName = 'インストールして9987円'
    public Icon = 'Icon/japan'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'インストール'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 2323, 6654, 9987], symbol: '円'}
    public reverseMoneyTag = true
}
