"use client"
import { addShortList } from "@/api/web/shortlist.action";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { addShortlistedPrograms } from "@/global-states/reducers/userReducer";
import { useMutation } from "@tanstack/react-query";

export function useShortListSetter() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({
      programId,
      foundationId,
    }: {
      programId: string;
      foundationId: string;
    }) => addShortList(programId, foundationId),
    onSuccess: (res: any) => {
      dispatch(addShortlistedPrograms(res.data.data));
    },
  });
}
