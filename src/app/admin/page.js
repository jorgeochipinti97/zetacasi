"use client";
import useUsers from "@/hooks/useUsers";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import useTransactions from "@/hooks/useTransactions";
import Login from "@/components/Login";
const Page = () => {
  const { users } = useUsers();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { transactions } = useTransactions();
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("en-GB", options)
      .replace(/,/, "");
  };

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div className="w-screen flex justify-center ">
      <div className="w-10/12 md:w-8/12  border-2 p-2 mt-10 rounded-xl">
        <Tabs defaultValue="transaction" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transaction">Transacciones</TabsTrigger>
            <TabsTrigger value="user">Usuarios</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="">usuario</TableHead>
                  <TableHead>Contraseña</TableHead>
                  <TableHead className="">Creación</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.user}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell className="w-[300px]">
                      {" "}
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg border-black   cursor-pointer"
                          >
                            Ver usuario
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Transacciones</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="transaction">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="">Usuario</TableHead>

                  <TableHead className="">Celular</TableHead>
                  <TableHead className=""></TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-2xl  ">{user.user}</TableCell>

                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg border-black   cursor-pointer"
                          >
                            Ver comprobante
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="flex justify-center">
                          <img
                            src={`${user.url}`}
                            className="w-[500px] rounded-xl"
                          />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-2xl font-bold">
                      {" "}
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
