'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useRef, useState } from 'react';

import GtwQRCode from '@/components/gtw-qr/gtw-qr-code';
import LoadingQRCode from '@/components/gtw-qr/loading-qr-code';
import { LoginSessionV3 } from '@/types/user';
import { useMediaQuery } from '@react-hookz/web';
import { Socket, io } from 'socket.io-client';

import { useTheme } from '@mui/system';

export default function LoginQrCode() {
  const socketRef = useRef<Socket | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | undefined>();
  const theme = useTheme();
  const session = useSession();
  const router = useRouter();
  const isDesktop = useMediaQuery(
    theme.breakpoints.up('md').replace('@media ', ''),
    {
      initializeWithValue: false,
    }
  );

  const login = async (token: string, privateKey: string) => {
    try {
      const res = await signIn('credential-jwt', {
        token,
        privateKey,
        redirect: false,
      });

      if (!res) {
        throw new Error("Couldn't login");
      }

      if (res.error) {
        throw res.error;
      }

      router.push('/dashboard/v3');
    } catch (e) {
      console.log(e);
    }
  };

  const initializeSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(`${process.env.NEXT_PUBLIC_BFF_API_SERVER}user`, {
      extraHeaders: {
        'connection-type': 'login',
      },
    });

    socketRef.current.on('create-pub', (publicKey: string) => {
      const sessionId = socketRef.current?.id;
      console.log(`[socket ${sessionId}] connected`);
      if (process.env.NODE_ENV !== 'production') {
        console.log({ type: 'login', sessionId, publicKey });
      }
      setQrCodeData(JSON.stringify({ type: 'login', sessionId, publicKey }));
    });

    socketRef.current.on('login', async (event: LoginSessionV3) => {
      console.log(`[socket] login`, event);
      const { token, privateKey } = event;
      login(token, privateKey);
    });

    socketRef.current.on('disconnect', (e) => {
      console.log(`[socket] disconnected`);
      setQrCodeData(undefined);
    });
  }, []);

  const onLogin = async () => {
    const tokenRafa =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6Z2F0ZXdheWlkOm15Z2F0ZXdheTo3ZDMzZjE1OTgxZDYwNmM5MGJjYWY0ZjYyOTMyZWQxOGI3M2RkYzhiODQxODkwODM5MDVhOGFiNGRiZGJmNmEyIiwicHJvdG9jb2xfaWQiOiIzNWM2YzVkNi1jZWM0LTQ4ZWItODcxNC03NWNkYTllODAxMTEiLCJpYXQiOjE3MTcwMTA4MTN9.-TxwulDeUssaB5sll8dAgeFjwOyazBFIg_EVlN7dDeo';
    const tokenJoao =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWQiOiJkaWQ6Z2F0ZXdheUlkOm15Z2F0ZXdheTozYTdlYjgzODhkY2M5MTk5ZTllZDFlYjFmM2UwZWQxMzE5YjM4M2RhYzU3YmQzZDA5ZjkwMDIxNjgzMGI2ZTE0IiwicHJvdG9jb2xfaWQiOiJkM2JhY2U2Mi1hMDA3LTRiYmQtOGU5My01MWI2MDhhYzA1YjIiLCJpYXQiOjE3MTQzOTczOTN9.EUXznbnHlm7PEq9UiJFuqES_C__KP8PD6oCr5UpCuLQ';
    const privateKey =
      'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQ0KTUlJSktBSUJBQUtDQWdFQS9jQklUb1NySTRwNmR2cmtIMjNLRWNzbDRyWCtkWWg5WFV4bWh4QUVZaVJQTTYwWg0KVkEzdnN5NzYvR2luZzRmTElvTHBoV0VEVHZOVmFOZWpONjFOOE1IS3hZU28yWkVIa1EvcG43SXZCdkpSVmpPaQ0KbWE0UENNcElFWFlaM1phZE1TOS9KV3BycXJaVE5JWjB2eTNIbWZPampyQTlRWkZ1Unp2c1BiZEtqbVd3ZXl2bg0KZzVSdFBqOFFRTm9wR2p5TktSS3FHLzhURGFJK0NoT0FDTmpmc0pjditOQVZsQ2Jtckg0RDJ1UHloQVJWUmdxMA0KZVJhY1B3U3ZMMDRGTDRMVy9PakVCTVo2c3lDNXRjTlNUQnlzSFpZRXFRclZBd2NEQVZpTW9IWUl6QmJtMkhmYQ0KVHpNUWUrQzZmM0RpMXQvT3Frd2ZNaCs4bkxaR1JmZk1aUzNRQ2JHU25GSkhVanJCc3RKbTJoL0JyU0dlMlNDTQ0KRWE3NVYvRVFDWkt1SFB2UHpyLzIvaVdCdHhzL1BCaWFzUE41VStEMHJYaHNXMk5JeURxODgrZXRoV2tHTUJPeA0KL3RSdlg2aVp6Q280L3JoNnJsdW5qZ2ZORHU0RngyRFFzb1NoQ0lCZ3FocmtHdFdiOEFpa2NGSms1NHNQY3YvRA0KNGhRNnFTRU9MdWxrNTZqbmhmbWxBdVVmZDVBUW9WQmtyb2pabnJDU3cyemVFdzUybzZXRitGQi81TzEycU5Eeg0KYVhNZkF4VHVHY1dHY3FVdml5WktMaSszdk50QnVTc3I5UEZ3MzlxdVJ4c1hyZ3FQNWx5amNBdjBxQnhlUWswVg0KaEFTUWw4czBtdlFqU08vMUR1WHA1ZWNtZEl4SXhsK0gyaVZXcEJKWHNCZXUwZUswcTAvbElJV1pHWDhDQXdFQQ0KQVFLQ0FnQnpjS0cwanVpb3Y1d2RPdUREWjVneFppRXpOYWF3NDhwY3dxQTJPOVF5cmVBV1cxNlZmYzJaei9yQg0KRC85OWVDNnk0YW5KVXl4Rkk3Q3NoTVd0VTd1TWx5MWZsSTJZaFVGUy9sRkRwTFYrVElreVZVVlk4dlhHQXZpcw0KY1BVdGVSTEVTSjVvY0RUUk1pZENVeFVUMElqcEFnMWJvZFFNVzFRM05neXd1dzFCSVFRYjFRcDdNdkJNRERhaA0KdWw1T29GTjc1eERhc2IyQ1MxZzhEMGtGUFZ6dW9xbGhZWkVmbUY4REJFVk90THNrMGkvVk1KT1FMdmdnTjBwWA0KbEFBSjhGVk1NN3pSaTFaUTNjZCs2SUF0UGpJVE42ZWhHOXR5aUNNVzNxa0Rhdzl2Z2MrOWxURU5MT2NINUdJVQ0KRGxBMGZ4Y3ZKSGhndmsxNVlmY3daNTVtUFdSUnpMNlYwT29FZFk5SUd1bGREMnl2N28rTkZoS01Jc3UyNWo2Ng0KU2xPZGgrMFNIeHQ0Mm5Sc01ZK01MQUJhTXI3UUNIdkFRdTZTTWVNWDJTa3l6QkdGVVc4dE9hWWRvYjB2RkdmaA0KSXdnbXJjVllyU09PZEJwRk82eWdpdzhMMVlBekYwejNWOGRlZmxGR0YyUklRWXg1SUpFRjJKSU00ZitqdElDUg0KVW9Va0drZ1FLMVgydm9OMk56TTFPbmczZXkxV3hvNU5tRy9DUjlnZTdHSjMvWC96OWdyTVFFVllVdDFkcWd4eQ0KSHVNTnE0ZU5MN1IzQWt1b2dIMTVobU1KVHVPc0JuNFhtV3JDYXcyVDdmLytPc0NyQ005ZkJWMFZNNGhxQzBvaQ0KOE1teENUcmRhQzhwRXQ0M1k5UTBiUEJxd2JyZngyYUQyUmFjTWh3SHNLQmVoT3k1V1FLQ0FRRUEvMDhXQmI3bA0KRFlLQ3FaQVdZUjc1YjFoNWNJRDRxRkdhQ0JScC91YWxMOGsxVkNiZTllM2NySVIrRkVtN3lzNys5dTFTUDRlZg0KU0s1VnRXVy96dlZrSUZicUx4WVJiM2NHZ0NoaVl1aURWV08vcTlCc2E1eklzTTl4MGxGeEo3U3l0S3hOUDdKQg0KQk4yYzZKcjdBNnIra3dUUzFnYVUzRmd6UzZBaGUyN2xmUFhoSGsxNk8rc0puQzBPKzZSeFkrdDBYWWhIcm1wUA0KdTJ0amd1OGN2Q2FOaGk2OTlhWjM2am9ibFdZSTlxUjNiTkVacGpGb3lIZXNBWE9KM1VBWFkyVHZDTWZKREtRVQ0KMXhTa2NkMXlCcUpUMHcveGxYZWZBYUc0SURzWktFL2UyM2xBVG5PcnhqTmlwQ2FLL1RMbFo4RXU5UmU5bXBNMA0KdmJXRnMwd1MzT2tuZFFLQ0FRRUEvbkFkNzk4R1JoYlRyd0VQbHRDR0hCUmFadGt6ZWpYeEhuaFZvYmxlMldPeg0KTCtKY0F2N0Z6TUtUUXRRVjdGcnZyZXNENU5YUnZ2b0Qwd2RuS0NuS3Vkc3ZxaVJsTVFRZklxb3dpdzJxZ0N2Tg0KUVozQzRXNURzck1WR2lPcWwzMXJ5aHRrZ0EzSERHbFo4ZzNmNWlvdjRmY0MwcXEzanhsK0NFcnRiN0VBOTBobg0KakIxN05mTUo2SUlzZVlvUmc1UVdTTzhwR0RveHc3b1Q2NFduL0JzcUNKZnVNalN1b080SkdmQUxTTWZiYVY1eQ0KSC81V0hsc0hTd0hVeFpWakZLNEI3Q0ZrdlY1RFVHclMwSENnSDVhQmt5dVRuN1A5cGhmS2ZQRW92NTZLbzg2RA0KWUJubnQ2TGhaTlgxTlFwakEwNit2VUNzeDdPWTRTbkE5MXpwN2N2U293S0NBUUIyYlhrSnNVTU93VHRhN0R0MQ0KVWFqaXZXZVhpRHZQMkFwYk5SejE0SWMvWTFZWmN1NTVwWngzYWY0UjZ5SHhNWk9UZHdKdjlia3RQYkVFTSs2Rg0KVWM3Z01YRHY1b3l2NThaY0xGOTNBZVBwK0JzdzE3MXpMWWJxZlUrTy83ZzljdFJ5ZW5wYTBaVFhiUFViOE1mLw0KSzVKcklCR3N0ZURYVlJKMlFoRkY4R3NEVEFyZ3c0K3Z1NWI1bXUwWVRXOUxxaXlRTm1jSndNYTdhVlQvcDJycw0KMi9WS0NPU1V6bU5SZ3lMSWFrdytISXhKTGJWNElmTTVDa24vWWxqUkNLblFzVUV3RVh4eElLdUtHVWt1aUVvYw0KU2JBWWQ0ellpR1I1blVxTHFONUNsTW9MaEhNUDhSZjlHRmpwUy9lcys2N3VNZTVXUW16eEJ0ZXdLRU9jcCswWQ0KREE4QkFvSUJBUUQyM0E2ZnFWSHI5TC9DL3BPQ2JxUi9YOXZxQjNnamJXeVlkSVlZbDhLSHhteVcyOWNMN09ZNg0KYU5uNXI4M3BlTDBzajJWQ3c1Vng1aDZKdzVmNVpyclRJZThYODZIZU1iS0hybm5Vb0JpNXJFWEVFTzJBVEx3UQ0KQ0NKRUx6Q1hORSs5VW1CcXdYTksvbmdQR2hrT3RnV3BCa0JONXVhYlIwOTVla0R0NmQwWERyK3dPUFpPL0pPeg0KYTREOUZ0RXhTUjlwK2VoMElob2dYVXh3YVVmM21OOXFZUVh3M2g1RDgwOFBSRStlZUpIUHBKdXpvTThyT29SVA0KNk4zb0thMXM1ZnJsZit5K3NsTTdGYm1lRkhlMnpnNi9uRHJwYXZlQkMzb2hTTldSUEtBa2wvdnM1SlZtSFBqMA0KSFlaL3hLa1dEM09PS002Nkh1MElJTHVoQkJ2TzVMOWpBb0lCQUh0S0l0VnIxSllrRVdyT0hCbzZ1c0ZYMmY3WQ0Kd210aGN0OGs5aFJXUzlTWVY1Q0VuRjRvNW5kV2tkYXlzZEtxVXNVdHUyNUsrSkNuZThmMGIycEJod3pmQ2xzTQ0KZ0ZaYUtKUElWSGZYbnM1NHBESW9oL0IzSjJFcm83dnRyTnRZQURLMXp5ZDFCMExsNllLUnowM2JTM3RXbmxKKw0KOE1hVDFHdmtUK3NQQlNLL3l1OVRaalpGM1Nyc1JuWFlyUHNoNmVub0dSY2szSm12MXJtSGhzZEhmbHltVWF4Rw0KeVlSZnM2a0w5SUN4TW1UQkg5YTZXZ1RWNnVNOWRlb09ZRUpmbVppVnhROGUxZ3NJNmRlWUR6UGFZYWNqblZvRQ0KVUh0NHM5TkJtcHRpNTJZNTBYUGg1VGxzOXVMT0FERTlWVWZvbjhzU1M4c2JuT2RMTXRBUnlReGx6a3c9DQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQ0K';
    await login(tokenRafa, privateKey);
  };

  const onSignOut = async () => {
    try {
      await signOut({
        redirect: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      initializeSocket();
    }
  }, [isDesktop, initializeSocket]);

  return (
    <>
      <button type="button" onClick={onLogin}>
        Login
      </button>
      <button type="button" onClick={onSignOut}>
        SignOut
      </button>
      {qrCodeData ? <GtwQRCode value={qrCodeData} /> : <LoadingQRCode />}
    </>
  );
}
