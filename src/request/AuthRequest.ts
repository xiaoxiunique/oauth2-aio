import {AuthCallback} from '../model/AuthCallback';
import {AuthToken} from '../model/AuthToken';

export abstract class AuthRequest {
  /**
   *  返回授权地址
   * @param state
   */
  abstract authorize(state: string): string;

  /**
   * 通过 callback 返回的信息，获取得到用户信息
   * @param callback
   */
  abstract login(callback: AuthCallback): Promise<unknown>;

  /**
   * refresh
   * @param authToken
   */
  abstract refresh(authToken: AuthToken): Promise<void>;
}
