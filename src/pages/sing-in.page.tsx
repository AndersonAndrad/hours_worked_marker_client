import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

enum TypeTab {
  login = 'Login',
  singin = 'Singin'
}

export function AuthenticatePage() {
  const [seePassword, setSeePassword] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center">
      <Tabs defaultValue={TypeTab.login} className="w-[300px]">
        <TabsList className="w-full mb-6">
          <TabsTrigger value={TypeTab.login} className="w-full">{TypeTab.login}</TabsTrigger>
          <TabsTrigger value={TypeTab.singin} className="w-full">{TypeTab.singin}</TabsTrigger>
        </TabsList>
        <TabsContent value={TypeTab.singin} className="h-[600px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name</label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Nick name</label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password</label>
              <div className="flex gap-2 items-center">
                <Input type={seePassword ? 'text' : 'password'} />
                <Button variant='secondary' onClick={() => setSeePassword(!seePassword)}>{seePassword ? <EyeOff /> : <Eye />}</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Confirm Password</label>
              <div className="flex gap-2 items-center">
                <Input type={seePassword ? 'text' : 'password'} />
                <Button variant='secondary' onClick={() => setSeePassword(!seePassword)}>{seePassword ? <EyeOff /> : <Eye />}</Button>
              </div>
            </div>

            <div className="mt-12">
              <Button className="w-full" variant='secondary'>{TypeTab.singin}</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value={TypeTab.login} className="h-[600px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email / Nick</label>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Password</label>
              <div className="flex gap-2 items-center">
                <Input type={seePassword ? 'text' : 'password'} />
                <Button variant='secondary' onClick={() => setSeePassword(!seePassword)}>{seePassword ? <EyeOff /> : <Eye />}</Button>
              </div>
            </div>

            <div className="mt-12">
              <Button className="w-full" variant='secondary'>{TypeTab.login}</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}