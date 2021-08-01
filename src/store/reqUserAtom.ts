import { atom, selector } from 'recoil'
import { reqUser, initReqUser } from '../vo'
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import UserVO from 'src/vo/UserVO';
import { useState } from 'react';

interface ErrorProps {
  isError: boolean;
  message: string;
}

export const reqUserState = atom({
  key: 'ReqUserState',
  default: initReqUser(),
})

export const registrationUser = selector({
  key: 'sendEmailSelector',
  get: async ({ get }) => {
    
    const payload = get(reqUserState)
    console.log("reqUserState: " + JSON.stringify(reqUserState))
    console.log("reqUserState payload: " + JSON.stringify(payload))
    
    const [error, setError] = useState<ErrorProps>({
      isError: false,
      message: '',
    });

    try {
      const { data, status } = await HttpClient.post(
        '/user',
        new UserVO({ userId: payload.userId, userPassword: payload.userPassword }),
      );
      const { success, result } = new OTAResponse<UserVO>(data);
      console.log("success: " + success + "  // result: " + result)
      console.log("success: " + success + "  // result stringify: " + JSON.stringify(result))
    } catch (error) {
      setError({ isError: true, message: error.message });
      console.error(error);
    }

  },
})

// export const registrationUser = selector({
//   key: 'sendEmailSelector',
//   get: async ({ get }) => {
//     const payload = get(reqUserState)
//     try {
//       let urlWithString =
//         `http://localhost:3000/api/user?email=` +
//         payload.email +
//         `&customerName=` +
//         payload.name +
//         `&message=` +
//         payload.message
//       const res = await axios({
//         url: urlWithString,
//         method: 'get',
//       })
//       const status = `${res.data.status}`
//       console.log('API :: sendEmail :: results: ' + JSON.stringify(status))
//       return res?.data?.status
//     } catch (err) {
//       console.warn(err)
//       return `Error: ` + err
//     }
//   },
// })
