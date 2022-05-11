import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Spain extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Hipay  // 支付方式

    public CountryName = 'spain'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/spain'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'Instalar'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 30, 60, 90], symbol: '€'}
}
