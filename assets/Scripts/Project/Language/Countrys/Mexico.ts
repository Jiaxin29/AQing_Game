import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Mexico extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.CashApp  // 支付方式

    public CountryName = 'mexico'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/mexico'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'Instalar'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 400, 1000, 1800], symbol: '$'}
}
