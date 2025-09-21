import * as userApi from "@features/users/api/userApi";

export async function fetchUsers(filters) {
    const res = await userApi.getUsers(filters);
    if (!res.ok) throw new Error(res.error);
    return res.data;
}
