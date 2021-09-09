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
    const user = userList[0] || null;

    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, [userList]);

  const [excelName, setExcelName] = useState<string>();

  function excelExport(event: { target: any }) {
    let input = event.target;
    var reader = new FileReader();
    console.log('excel SheetNames input: ', input.name);
    console.log('excel SheetNames input: ', input.value);
    setExcelName(input.value);
    reader.onload = function () {
      var fileData = reader.result;
      var wb = xlsx.read(fileData, { type: 'binary' });
      wb.SheetNames.forEach(function (sheetName) {
        console.log('excel SheetNames: ', sheetName);
        var rowObj = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        // console.log('excel: ', JSON.stringify(rowObj));
      });
    };
    reader.readAsBinaryString(input.files[0]);
  }

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function uploadFile(formData: any) {
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
        var rowObj = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
        // console.log('excel: ', JSON.stringify(rowObj));
      });
    };
    reader.readAsBinaryString(data['excel_file'][0]);
    uploadFile(data);
  };

  async function test() {
    const { data, status }: AxiosResponse<OTAResponse<any>> =
      await HttpMultipartClient.put('/user'); //todo register 넘기는게 문젠데 음 어케 넘겨야하지 확인해보자
  }

  const onClickCancel = useCallback(() => {
    console.log('onClickCancel');
    test();
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
            <input id="excel_file" {...register('excel_file')} type="file" />
          </Grid>

          <Grid item xs={12}>
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
export const getStaticProps: GetStaticProps<{ userList: UserVO[] }> = async ({
  params,
}) => {
  // const userList: UserVO[] = await UserService.selectUser();

  return {
    props: {
      userList: [],
    },
  };
};

export default UserRegistration;
