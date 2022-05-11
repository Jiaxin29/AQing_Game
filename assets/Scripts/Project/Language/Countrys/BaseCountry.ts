import { PaymentType } from "../LanguageData";
import Amazon from "../Payments/Amazon";
import BBVA from "../Payments/BBVA";
import Boost from "../Payments/Boost";
import CashApp from "../Payments/CashApp";
import Dana from "../Payments/Dana";
import Gcash from "../Payments/Gcash";
import Grab from "../Payments/Grab";
import Hipay from "../Payments/Hipay";
import Kakaopay from "../Payments/Kakaopay";
import Linepay from "../Payments/Linepay";
import Momo from "../Payments/Momo";
import OVO from "../Payments/OVO";
import Pagseguro from "../Payments/Pagseguro";
import Paypal from "../Payments/Paypal";
import Paypay from "../Payments/Paypay";
import Paytm from "../Payments/Paytm";
import Picpay from "../Payments/Picpay";
import Promptpay from "../Payments/Promptpay";
import Qiwi from "../Payments/Qiwi";
import Stcpay from "../Payments/Stcpay";
import Truemoney from "../Payments/Truemoney";
import Visa from "../Payments/Visa";
import Zalopay from "../Payments/Zalopay";
const {ccclass, property} = cc._decorator;

@ccclass
export default class BaseCountry extends cc.Component {
    @property({
        type: cc.Enum(PaymentType),
    })
    public PaymentType: PaymentType = PaymentType.Paypal  // 支付方式

    public paymentFile = null

    public CountryName = null  // 国家名字(用于打印)
    public GameName = null  // 游戏名字
    public SecondName = null  // 第二名字
    public Icon = null  // Icon
    public InstallBtn = null  // 安装按钮
    public AndroidUrl = null  // 安卓链接
    public IosUrl = null  // Ios链接
    public MoneyConfig = null  // 金额配置
    public Title = null  // 游戏标题
    public GetCard = null  // 得卡界面
    public GetCardIcon = null  // 得卡小标记
    public FinishCard = null  // 结束界面
    public FinishBtn = null  // 结束按钮
    public finishOKFont = null  // 结束按钮文字
    public reverseMoneyTag = null  // 是否倒转金额标记
    
    onLoad () {
        this.importPayment()
    }

    importPayment() {
        let temp = [
            {index: PaymentType.Paypal, file: Paypal},
            {index: PaymentType.Promptpay, file: Promptpay},
            {index: PaymentType.Dana, file: Dana},
            {index: PaymentType.Hipay, file: Hipay},
            {index: PaymentType.Zalopay, file: Zalopay},
            {index: PaymentType.Qiwi, file: Qiwi},
            {index: PaymentType.Gcash, file: Gcash},
            {index: PaymentType.Truemoney, file: Truemoney},
            {index: PaymentType.Picpay, file: Picpay},
            {index: PaymentType.Pagseguro, file: Pagseguro},
            {index: PaymentType.Grab, file: Grab},
            {index: PaymentType.Linepay, file: Linepay},
            {index: PaymentType.Momo, file: Momo},
            {index: PaymentType.OVO, file: OVO},
            {index: PaymentType.Visa, file: Visa},
            {index: PaymentType.Boost, file: Boost},
            {index: PaymentType.Paypay, file: Paypay},
            {index: PaymentType.Stcpay, file: Stcpay},
            {index: PaymentType.Kakaopay, file: Kakaopay},
            {index: PaymentType.Amazon, file: Amazon},
            {index: PaymentType.CashApp, file: CashApp},
            {index: PaymentType.BBVA, file: BBVA},
            {index: PaymentType.Paytm, file: Paytm},
        ]

        let file = null
        for (let data of temp) {
            if (data.index == this.PaymentType) {
                if (data.file) {
                    file = data.file
                    break
                }
            }
        }

        if (!file) {
            console.log(`没有${PaymentType[this.paymentFile]}文件，强制改用paypal`)
            file = Paypal
        }

        this.paymentFile = this.node.addComponent(file)
    }
}
