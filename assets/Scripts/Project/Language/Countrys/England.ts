import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class England extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'endland'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/endland'
    // public InstallBtn = {bg: 'language/install/usa'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 30, 60, 90], symbol: '£'}
}
