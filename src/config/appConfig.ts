import { MediaQueries } from '../types/css';

interface IAppConfig {
  MEDIA_QUERIES: {
    [key in MediaQueries]: string;
  };
}

const CONFIG: IAppConfig = {
  MEDIA_QUERIES: {
    [MediaQueries.DESKTOP]: '@media (min-width: 992px)',
    [MediaQueries.SM]: '@media (max-width: 320px)',
  },
};

export default CONFIG;
