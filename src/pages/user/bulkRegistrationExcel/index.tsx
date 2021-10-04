import React, { useCallback, useEffect, useState } from 'react';

/**
 * next
 */
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import Link from 'next/link';
import Counter from 'src/components/Counter';

/**
 * recoil
 */
import { useRecoilState, useSetRecoilState } from 'recoil';

/**
 * Excel library sheetjs
 */
import xlsx from 'xlsx';

/**
 *  Material UI
 */
import {
  Button,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';

/**
 * store
 */
import { authState, counterState } from 'src/store';
import UserVO from 'src//vo/UserVO';

/**
 * Libarary
 */
import { useForm } from 'react-hook-form';

/**
 * component
 */
import ApoLayout from 'src/components/AppLayout';

/**
 * Common
 */
import HttpMultipartClient from 'src/common/framework/HttpMultipartClient';
import OTAResponse from 'src/common/framework/OTAResponse';

import axios, { AxiosError, AxiosResponse } from 'axios';

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, [userList]);

  const [excelName, setExcelName] = useState<string>();

  function get_header_row(sheet: { [x: string]: any }) {
    var headers = [];
    var range = xlsx.utils.decode_range(sheet['!ref']);
    var C,
      R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell =
        sheet[
          xlsx.utils.encode_cell({ c: C, r: R })
        ]; /* find the cell in the first row */

      var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);

      headers.push(hdr);
    }
    return headers;
  }
  const { register, handleSubmit } = useForm();

  // function get_header_row(sheet) {
  //   var headers = [];
  //   var range = XLSX.utils.decode_range(sheet['!ref']);
  //   var C,
  //     R = range.s.r; /* start in the first row */
  //   /* walk every column in the range */
  //   for (C = range.s.c; C <= range.e.c; ++C) {
  //     var cell =
  //       sheet[
  //         XLSX.utils.encode_cell({ c: C, r: R })
  //       ]; /* find the cell in the first row */

  //     var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
  //     if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

  //     headers.push(hdr);
  //   }
  //   return headers;
  // }

  // function undefinedToNull(value: any){
  //   return value ?? undefined = null :
  // }

  async function uploadFile(formData: any, excelData: any) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (event: { loaded: number; total: number }) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total),
        );
      },
    };

    let reqFormData = new FormData();
    reqFormData.append('excel_file', formData['excel_file'][0]);
    reqFormData.append('excel_data', JSON.stringify(excelData));

    let reqBody = JSON.stringify(excelData);

    console.log('body length', reqBody.length);
    console.log('body length22 ', JSON.parse(reqBody).length);
    console.log('body length22222 ', JSON.parse(reqBody)[0].length);
    let parseData: any[][] = JSON.parse(reqBody);

    // let params: { [key: string]: any }[] = [];
    // parseData.forEach((value: any, index: number) => {
    //   if (index != 0) {
    //     params.push({
    //       EVENT_ID: value[0] ?? null,
    //       STATUS: value[1] ?? null,
    //       USER_ID: value[2] ?? null,
    //       PASSWORD: value[3] ?? null,
    //       NAME: value[4] ?? null,
    //       PHONE_NUMBER: value[5] ?? null,
    //       EMAIL: value[6] ?? null,
    //       IS_USED_RECEIPT: value[7] ?? null,
    //       JOB: value[8] ?? null,
    //       BELONG_TO: value[9] ?? null,
    //       LICENSE_NUMBER: value[10] ?? null,
    //       SPECIALIST_NUMBER: value[11] ?? null,
    //       DEPOSIT_AMOUNT: value[12] ?? null,
    //       NATIONALITY: value[13] ?? null,
    //     });
    //   }
    // });
    // console.log('params', params);

    // let insertKeyQuery = `INSERT INTO ` + 'TB_USER' + ` ( `;
    // let insertValueQuery = `VALUES ( `;

    // params.forEach((object, paramIndex) => {
    //   Object.keys(object).forEach((key, index) => {
    //     let value = object[key] ?? null;

    //     let insertValue = '';
    //     if (typeof value === 'string') {
    //       insertValue = `'${value}'`;
    //     } else {
    //       insertValue = value;
    //     }

    //     if (paramIndex == 0) insertKeyQuery += index == 0 ? key : `, ${key}`;
    //     insertValueQuery += index == 0 ? insertValue : `, ${insertValue}`;
    //   });
    //   insertValueQuery += paramIndex == params.length - 1 ? '' : ' ) , (';
    // });

    // insertKeyQuery += ' ) ';
    // insertValueQuery += ' ) ';

    // const query = insertKeyQuery + insertValueQuery;

    // console.log('query: ', query);

    const { data, status }: AxiosResponse<OTAResponse<any>> =
      await HttpMultipartClient.post('/excel', reqFormData, config); //todo register 넘기는게 문젠데 음 어케 넘겨야하지 확인해보자
  }

  const onSubmit = (data: any) => {
    console.log('user search: ', data);

    if (data['excel_file'] === undefined || data['excel_file'] === null) return;

    var reader = new FileReader(); //todo 0907 이거 이용해서 excel 사용자 넣는거까지 마무리하자
    reader.onload = function () {
      var fileData = reader.result;
      var wb = xlsx.read(fileData, { type: 'binary' });
      wb.SheetNames.forEach(function (sheetName) {
        console.log('excel SheetNames: ', sheetName);
        var rowObj = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], {
          header: 1,
        });

        console.log('excel item:22 ', rowObj);
        console.log('excel item:22 length ', rowObj.length - 1);

        // console.log('excel: ', JSON.stringify(rowObj));

        uploadFile(data, rowObj);
      });
    };
    reader.readAsBinaryString(data['excel_file'][0]);
  };

  async function test() {
    const { data, status }: AxiosResponse<OTAResponse<any>> =
      await HttpMultipartClient.put('/user'); //todo register 넘기는게 문젠데 음 어케 넘겨야하지 확인해보자
  }

  const onClickCancel = useCallback(() => {
    console.log('onClickCancel');
    test();
  }, []);

  const onClickExcelExport = useCallback(() => {
    console.log('onClickExcelExport');

    let excelHandler = {
      getExcelFileName: function () {
        return 'on_the_air_member_upload_sample.xlsx';
      },
      getSheetName: function () {
        return 'member';
      },
      getExcelData: function () {
        return [
          [
            '이벤트코드',
            '상태 [ 1.심사중 2.활동 3.정지 ]',
            '아이디',
            '패스워드',
            '회원명',
            '휴대전화',
            '이메일',
            '영수증사용여부[ 사용시 Y 로 표시 ]',
            '직업',
            '소속',
            '면허번호',
            '전문의번호',
            '영수증금액 (숫자만)',
            '국가',
          ],
        ];
      },
      getWorksheet: function () {
        return xlsx.utils.aoa_to_sheet(this.getExcelData());
      },
    };

    let wb = xlsx.utils.book_new();
    // step 2. 시트 만들기
    var newWorksheet = excelHandler.getWorksheet();

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    xlsx.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기
    xlsx.writeFile(wb, excelHandler.getExcelFileName());
  }, []);

  return (
    <ApoLayout>
      <div>
        <Grid
          container
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={2}>
            <h3>EXCEL FILE: </h3>
          </Grid>
          <Grid item xs={10}>
            <input
              id="excel_file"
              {...register('excel_file')}
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onClickExcelExport}
            >
              Excel 형식 Down
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onClickCancel}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </div>
    </ApoLayout>
  );
}

// This function gets called at build time
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> =
  async () => {
    // const userList: UserVO[] = await UserService.selectUser();

    return {
      props: {
        userList: [],
      },
    };
  };

export default UserRegistration;
