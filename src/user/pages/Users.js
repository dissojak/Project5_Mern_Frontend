import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";

const Users = () => {
  // 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',

  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [users, setUsers] = useState();


  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/user/");
        setUsers(responseData.users);
      } catch (e) {
      }
    };
    req();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default Users;
