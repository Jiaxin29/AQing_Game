import { PaymentType } from "../LanguageData";
import BaseCountry from "./BaseCountry";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Italy extends BaseCountry {
    @property({
        type: cc.Enum(PaymentType),
        override: true
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public CountryName = 'canada'
    public GameName = null
    // public SecondName = 'Instalar para obtener 90€'
    public Icon = 'Icon/italy'
    public InstallBtn = {bg: 'common/blue_btn2', font: 'installare'}
    public AndroidUrl = null
    public IosUrl = null
    public MoneyConfig = {data: [0, 30, 60, 90], symbol: '€'}
}
