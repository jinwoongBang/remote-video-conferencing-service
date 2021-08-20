import OnTheAirVO from 'src/vo/OnTheAirVO';

export interface OTAResponseProps<T extends OnTheAirVO> {
  result?: T[];
  reference?: ReferenceType;
  success?: boolean;
  code?: number;
  message?: string;
}

export type PaginationType = {
  pageNumber: number;
  pageCount: number;
  itemCount: number;
  returnCount?: number;
};

// 타입을 추가해서 사용하면 됨.
export type ReferenceType = PaginationType; // | ETCType1 | ETCTYPE2 ...

class OTAResponse<T extends OnTheAirVO> {
  // map(arg0: (x: any) => { regDate: any }): any {
  //   throw new Error('Method not implemented.');
  // }
  result: T[];
  reference?: ReferenceType;
  success: boolean;
  code: number;
  message: string;

  constructor(json?: OTAResponseProps<T>) {
    this.result = json?.result || [];
    this.reference = json?.reference;
    this.success = json?.success || true;
    this.code = json?.code || 200;
    this.message = json?.message || '성공';
  }

  mappingData(responseEntity: new () => T) {
    if (this.isExtends(responseEntity)) {
      this.result = this.result.map((item) =>
        Object.assign(new responseEntity(), item),
      );
    } else {
      throw new Error(
        '적절하지 않은 VO 객체 입니다. OnTheAirVO 로 확장해서 사용해주세요.',
      );
    }
  }

  isExtends(responseEntity: any): responseEntity is T {
    return responseEntity.prototype instanceof OnTheAirVO;
  }
}

export default OTAResponse;
