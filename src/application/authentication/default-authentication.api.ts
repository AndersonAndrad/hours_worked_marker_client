import { DefaultAuthentication } from "@/interfaces/authentication.interface";
import serverApi from "@/infra/api/server.api";
import { toast } from "sonner";

export class Authentication {
  private AUTHENTICATION_URL: string = 'authentication';

  defaultAuthentication(authentication: DefaultAuthentication): Promise<string> {
    return new Promise((resolve, reject) => {
      serverApi
        .post(`${this.AUTHENTICATION_URL}/default`, authentication)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((error) => {
          toast('Error to load tasks', { description: error.message });
          reject(error);
        });
    })
  }
}