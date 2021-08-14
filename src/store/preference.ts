import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import { PreferenceKey } from 'src/common/preference';

type SiteInformationProps = {
  isInit: boolean;
  name: string;
  phoneNumber: string;
  mail: string;
  copyright: string;
};

export const siteInformationState = atom<SiteInformationProps>({
  key: 'insertPreferenceBySiteInformationParamState',
  default: {
    isInit: false,
    name: '',
    phoneNumber: '',
    mail: '',
    copyright: '',
  },
});

export const callInsertSiteInformation = selector<{ method: string }[]>({
  key: 'callInsertSiteInformation',
  get: async ({ get }) => {
    const param = get(siteInformationState);
    if (param.isInit) {
      const { data, status }: AxiosResponse<OTAResponse<{ method: string }>> =
        await HttpClient.put('/preference', {
          [PreferenceKey.RepresentativeName]: param.name,
          [PreferenceKey.RepresentativePhone]: param.phoneNumber,
          [PreferenceKey.RepresentativeMail]: param.mail,
          [PreferenceKey.CopyrightSignature]: param.copyright,
        });

      return data.result;
    }

    return [];
  },
});
