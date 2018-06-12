/**
 * Created by milad on 3/16/18.
 */

export default  {
  paymentURL: "https://sep.shaparak.ir/Payment.aspx",
  merchantID: '10739221',
  verifyTransactionSoapUrl: "https://sep.shaparak.ir/payments/referencepayment.asmx?WSDL",
  states: {
    'CanceledByUser': 'تراکنش توسط خریدار کنسل شده است.',
    'Failed': 'پرداخت انجام نشد.',
    'SessionIsNull':'کاربر در بازه زمانی تعیین شده پاسخی ارسال نکرده است.',
    'InvalidParameters': 'پارامترهای ارسالی نامعتبر است.',
    'MerchantIpAddressIsInvalid': 'آدرس سرور پذیرنده نامعتبر است.',
    'TokenNotFound': 'توکن ارسال شده یافت نشد.',
    'TokenRequired': 'با این شماره ترمینال فقط تراکنش های توکنی قابل پرداخت هستند.',
    'TerminalNotFound': 'شماره ترمینال ارسال شده یافت نشد.'
  },
  verifyErrorCode:{
    '-1': 'خطا در پردازش اطلاعات ارسالی.',
    '-3': 'ورودی ها حاوی کاراکتر غیر مجار میباشند.',
    '-4': 'Merchant Authentication Failed.',
    '-6': 'سند قبلا برگشت کامل یافته است.',
    '-7': 'رسید دیجیتالی تهی است.',
    '-8': 'طول ورودی ها بیش از حد مجاز است.',
    '-9': 'وجود کاراکتر غیر مجاز در مبلغ برگشتی.',
    '-10': 'رسید دیجیتالی به صورت BASE64 نیست.',
    '-11': 'طول ورودی ها کمتر از حد مجاز است.',
    '-12': 'مبلغ برگشتی منفی است.',
    '-13': 'مبلغ برگشتی برای برگشت جزیی بیش از مبلغ برگشت نخورده ی رسید دیجیتالی است.',
    '-14': 'چنین تراکنشی تعریف نشده است.',
    '-15': 'مبلغ برگشتی به صورت اعشاری داده شده است.',
    '-16': 'خطای داخلی سیستم.',
    '-17': 'برگشت زدن جزیی تراکنش مجاز نمیباشد.',
    '-18': 'آدرس IP فروشنده نامعتبر است.'
  },
  customState:{
    'invalid RefNum': 'شماره مرجع اشتباه می باشد',
    'invalid Payment': 'پرداخت مربوط به این پذیرنده نمی باشد'
  },
  soapClientURI: 'https://sep.shaparak.ir/Payments/InitPayment.asmx?WSDL'
};

