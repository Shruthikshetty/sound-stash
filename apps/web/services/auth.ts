/*
 * this file contains all the services related to auth
 */

import { appClient } from "@/lib/api-client";
import { MUTATION_KEYS } from "@/constants/query-keys";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationKey: [MUTATION_KEYS.authLogin],
    mutationFn: async (token: string) => {
      const res = await appClient.auth.$post({ json: { token } });
      return res.json();
    },
  });
