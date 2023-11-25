'use client';
import axios from 'axios';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ChangeEvent, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PDFData } from '@/lib/types';

const formSchema = z.object({
  file: z
    .string()
    .min(1, 'Please upload a file.')
    .refine(
      (filePath) => {
        const fileExtension = filePath.split('.').pop();

        return fileExtension === 'pdf' ? true : false;
      },
      { message: 'This is not a pdf file.' }
    ),
});

interface PDFExtractFormProps {
  onDataReceive: (e: PDFData[]) => void;
}

const PDFExtractForm: React.FC<PDFExtractFormProps> = ({ onDataReceive }) => {
  const [file, setFile] = useState<File>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    if (file) {
      formData.set('name', file.name);
      formData.set('file', file);
      formData.set('path', values.file);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('/api/pdf', formData, config);
      onDataReceive(response.data);

      toast.success('Data extracted');
      form.reset();
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='w-[250px]'>
          <CardHeader>
            <CardTitle>PDF Data Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name='file'
                render={({ field }) => {
                  const modifiedField = {
                    ...field,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files?.length) {
                        setFile(e.target.files[0]);
                      }

                      form.setValue('file', e.target.value);
                    },
                  };

                  return (
                    <FormItem>
                      <FormLabel htmlFor='pdf-file'>
                        Upload a PDF file
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='pdf-file'
                          type='file'
                          accept='.pdf'
                          {...modifiedField}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button disabled={form.formState.isSubmitting} type='submit'>
              Extract
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default PDFExtractForm;
