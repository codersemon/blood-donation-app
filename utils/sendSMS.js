// dependencies
import axios from "axios";

/**
 * @description send sms to phone by using sms api
 * @param {*} to - in which phone should send sms
 * @param {*} msg - short message text
 */
export const sendSMS = async (to, msg) => {
  await axios.get(
    `http://bulksmsbd.net/api/smsapi?api_key=${process.env.PHONE_SMS_API}&type=text&number=${to}&senderid=8809617612987&message=${msg}`
  );
};
