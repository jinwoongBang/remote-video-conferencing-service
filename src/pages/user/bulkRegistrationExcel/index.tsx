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
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilStateLoadable,
} from 'recoil';

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
  Box,
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
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';

import axios, { AxiosError, AxiosResponse } from 'axios';

import { forceReloadExcelListState, excelListSelector } from 'src/store/excel';

import { makeStyles, Theme } from '@material-ui/core/styles';

import Loading from 'src/components/Loading';
import { IExcel } from 'src/vo/ExcelVO';

const useConfirm = (
  message: string,
  onConfirm: (() => void) | undefined,
  onCancel: () => void,
) => {
  if (!onConfirm || typeof onConfirm !== 'function') {
    return;
  }
  if (onCancel && typeof onCancel !== 'function') {
    return;
  }

  const confirmAction = () => {
    if (window.confirm(message)) {
      onConfirm();
    } else {
      onCancel();
    }
  };

  return confirmAction;
};

const useStyles = makeStyles((theme: Theme) => ({
  inputLabelContainer: {
    display: 'flex',
    background: '#028a0f',
    border: '1px solid black',
    minHeight: '5vh',
    justifyContent: 'center',
    alignItems: 'center',
    '& label': {
      color: 'white',
    },
  },
  inputContainer: {
    display: 'flex',
    border: '1px solid black',
    minHeight: '5vh',
    justifyContent: 'left',
    alignItems: 'center',
    paddingLeft: '10px',
  },
  buttonContaier: {
    display: 'flex',
    justifyContent: 'center',
    padding: '15px',
  },
  subTitle: {
    paddingBottom: '10px',
    '& label': {
      fontSize: '15px',
      color: '#028a0f',
      fontWeight: 'bold',
    },
    boxShadow: '1px 3px 1px #9E9E9E',
  },
  subTitleCount: {
    fontSize: '15px',
    color: 'black',
    fontWeight: 'bold',
  },
  divider: {
    padding: '15px',
  },
  excelDefaultDownBtn: {
    background: 'linear-gradient(45deg, #32CD32 30%, #00FF00 90%)',
    marginRight: '15px',
    boxShadow: '1px 2px 1px #DCDCDC',
    color: 'white',
    fontWeight: 'bold',
  },

  excelDeleteBtn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: '2vh',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  boardTitleContainer: {
    display: 'flex',
    background: '#32CD32',
    border: '1px solid black',
    minHeight: '3vh',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '1px 2px 1px #DCDCDC',
    paddingBottom: '3px',
    // '& label': {
    //   color: 'white',
    // },
  },
  boardContentContainer: {
    display: 'flex',
    border: '1px solid black',
    minHeight: '3vh',
    justifyContent: 'left',
    alignItems: 'center',
    paddingLeft: '10px',
    '& a': {
      color: 'blue',
    },
  },
  boardBtnContainer: {
    display: 'flex',
    border: '1px solid black',
    minHeight: '3vh',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '10px',
  },
}));

// function excuteUpdateQuery(
//   tableName: string,
//   param: { [key: string]: any },
//   whereQuery: string,
// ) {
//   // UPDATE table_name SET name = '테스트 변경', country = '대한민국' WHERE id = 1105;

//   let updateSetQuery = `UPDATE ` + tableName + ` SET `;
//   let updateWhereeQuery = ` WHERE ${whereQuery}`;

//   let keys = Object.keys(param);
//   keys.forEach((key, index) => {
//     let value = param[key] ?? null;

//     let updateValue = '';
//     if (typeof value === 'string') {
//       updateValue = `'${value}'`;
//     } else {
//       updateValue = value;
//     }
//     updateSetQuery +=
//       index == keys.length - 1
//         ? ` ${key} = ${updateValue} `
//         : ` ${key} = ${updateValue} ,`;
//   });

//   const query = updateSetQuery + updateWhereeQuery;

//   console.log('query: ', query);
// }

const Board = () => {
  const [excels, reload] = useRecoilStateLoadable(excelListSelector);

  const classes = useStyles();
  console.log('users: ', excels);
  // const menuList = menus.map((menu) => (<li>{menu}</li>));

  const onClickDelete = useCallback(async (item) => {
    console.log('onClickDelete', item);

    const positive = async () => {
      const { data, status }: AxiosResponse<OTAResponse<any>> =
        await HttpClient.delete('/excel', { data: { excelId: item } });
      console.log('data', data);
      console.log('status', status);
      if (status == 200) {
        reload(null);
      }
    };

    const nagative = () => {
      console.log('nagative');
    };
    const confirm = useConfirm('삭제하시겠습니까?', positive, nagative);

    confirm?.();
  }, []);

  switch (excels?.state) {
    case 'hasValue':
      return (
        <div>
          <Grid container>
            <Grid item xs={12} className={classes.subTitle}>
              <label>
                EXCEL 업로드 내역 (
                <label className={classes.subTitleCount}>
                  {excels?.contents?.result?.length}건
                </label>
                )
              </label>
            </Grid>
            <Grid item xs={3} className={classes.boardTitleContainer}>
              <label>등록일</label>
            </Grid>
            <Grid item xs={7} className={classes.boardTitleContainer}>
              <label>파일 이름</label>
            </Grid>
            <Grid item xs={2} className={classes.boardTitleContainer}>
              <label>관리</label>
            </Grid>
          </Grid>
          {excels?.contents?.result?.map((item: any) => (
            <Grid container key={item}>
              <Grid item xs={3} className={classes.boardContentContainer}>
                <label>{item.DATE_OF_CREATED}</label>
              </Grid>
              <Grid item xs={7} className={classes.boardContentContainer}>
                {/* href="javascript:void(0);" */}
                <a
                  href={`https://d1e19d91hzb56g.cloudfront.net/test/${item.FILE_NAME}`}
                  download
                >
                  {item.FILE_NAME} ( ADD. {item.ADD_USER_COUNT}건 )
                </a>
              </Grid>
              <Grid item xs={2} className={classes.boardBtnContainer}>
                <Button
                  className={classes.excelDeleteBtn}
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={(id) => onClickDelete(item.ID)}
                >
                  삭제
                </Button>
              </Grid>
            </Grid>
          ))}
        </div>
      );

    case 'hasError':
      return <div>Error...</div>;

    case 'loading':
      return (
        <div>
          <Loading />
        </div>
      );
  }
};

function UserRegistration({
  userList,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const classes = useStyles();

  useEffect(() => {
    console.log('getStaticProps() :: useEffect (mount)');
    return () => {
      console.log('getStaticProps() :: useEffect (unmount)');
    };
  }, [userList]);

  const { register, handleSubmit } = useForm();

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

    const { data, status }: AxiosResponse<OTAResponse<any>> =
      await HttpMultipartClient.post('/excelUpload', reqFormData, config); //todo register 넘기는게 문젠데 음 어케 넘겨야하지 확인해보자
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
          <Grid item xs={2} className={classes.inputLabelContainer}>
            <label>EXCEL FILE</label>
          </Grid>
          <Grid item xs={10} className={classes.inputContainer}>
            <input
              id="excel_file"
              {...register('excel_file')}
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          </Grid>

          <Grid item xs={12} className={classes.buttonContaier}>
            <Button
              className={classes.excelDefaultDownBtn}
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onClickExcelExport}
            >
              엑셀양식
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

        <Grid item xs={12} className={classes.divider}></Grid>

        <Board />
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
