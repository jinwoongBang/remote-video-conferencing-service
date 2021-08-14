import { AxiosResponse } from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import HttpClient from 'src/common/framework/HttpClient';
import OTAResponse from 'src/common/framework/OTAResponse';
import { PreferenceKey } from 'src/common/preference';

type SiteInformationProps = {
  name: string;
  phoneNumber: string;
  mail: string;
  copyright: string;
};

export const siteInformationState = atom<SiteInformationProps>({
  key: 'insertPreferenceBySiteInformationParamState',
  default: {
    name: '',
    phoneNumber: '',
    mail: '',
    copyright: '',
  },
});

export const InsertSiteInformationSelector = selector<{ method: string }[]>({
  key: 'InsertPreferenceBySiteInformation',
  get: async ({ get }) => {
    const param = get(siteInformationState);
    const { data, status }: AxiosResponse<OTAResponse<{ method: string }>> =
      await HttpClient.put('/preference', {
        [PreferenceKey.RepresentativeName]: param.name,
        [PreferenceKey.RepresentativePhone]: param.phoneNumber,
        [PreferenceKey.RepresentativeMail]: param.mail,
        [PreferenceKey.CopyrightSignature]: param.copyright,
      });

    return data.result;
  },
});
