import { DocumentLine } from '@/models/interface';
import itemRepository from '@/services/actions/itemRepostory';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';
import { ComponentType } from 'react';
import { MutationFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export interface WithRouterProps<T = ReturnType<typeof useParams>> {
    history: {
        back: () => void;
        goBack: () => void;
        location: ReturnType<typeof useLocation>;
        push: (url: string, state?: any) => void;
    }
    location: ReturnType<typeof useLocation>;
    match: {
        params: T;
    };
    edit?: boolean,
    navigate: ReturnType<typeof useNavigate>;
    query?: any,
}

export const withRouter = <P extends object>(Component: ComponentType<P>) => {
    const uomGroupRepo = new UnitOfMeasurementGroupRepository();


    return (props: Omit<P, keyof WithRouterProps>) => {
        const location = useLocation();
        const match = { params: useParams() };
        const navigate = useNavigate();
        const queryClient = useQueryClient();

        const history = {
            back: () => navigate(-1),
            goBack: () => navigate(-1),
            location,

            push: (url: string, state?: any) => navigate(url, { state }),
            replace: (url: string, state?: any) => navigate(url, {
                replace: true,
                state
            }),

        };

        const items: any = useQuery({
            queryKey: ["items"],
            queryFn: () => new itemRepository().get(),
            staleTime: Infinity,
        });


        const query = {
            getItems: async (itemLines: DocumentLine[]): Promise<DocumentLine[]> => {
                // const uomGroups: any[] = await uomGroupRepo.get();
                // const lines = itemLines.map((row) => {
                //     const item = items.data.find((e: any) => e.ItemCode === row.itemCode);
                //     const uomGroup = uomGroups.find((e: any) => e.AbsEntry === item.UoMGroupEntry);
                //     console.log(uomGroup);
                //     row.setUOMGroup(uomGroup);
                //     return row;
                // });

                // return lines;
                return [];
            },
            mutation: (key: string, cb: any) => {
                return useMutation(cb, {
                    onSuccess: (data: any) => {
                        queryClient.setQueryData(key, (oldData: any) => {
                            return {
                                ...oldData,
                                data: [...oldData.data, data],
                            }
                        });
                    }
                })
            }
        };


        return (
            <Component
                history={history}
                location={location}
                match={match}
                navigate={navigate}
                query={query}
                {...props as P}
            />
        );
    };
};