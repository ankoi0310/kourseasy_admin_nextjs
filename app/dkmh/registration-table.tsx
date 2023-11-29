import TryAgainButton from '@/app/dkmh/try-again-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Typography } from '@/components/ui/typography'
import { CourseRegistrationMapping } from '@/lib/types'
import React, { Dispatch, SetStateAction } from 'react'

type RegistrationResultTableProps = {
  courseRegistrationMapping: CourseRegistrationMapping
  setCourseRegistrationMapping: Dispatch<SetStateAction<CourseRegistrationMapping>>
}

const RegistrationResultTable = ({ courseRegistrationMapping, setCourseRegistrationMapping }: RegistrationResultTableProps) => {
  const total = Object.keys(courseRegistrationMapping).length
  
  return (
    <div className={'w-full flex flex-col justify-start gap-2'}>
      <Typography variant={'h5'}>
        Total: {total} results
      </Typography>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={'text-center'}>Course Group Id</TableHead>
            <TableHead className={'text-center'}>Status</TableHead>
            <TableHead className={'text-center'}>Error</TableHead>
            <TableHead className={'text-center'}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            total === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={'flex flex-col items-center justify-center gap-4'}>
                    <div>There is no registration result</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              Object.entries(courseRegistrationMapping).map(([id, result]) => (
                <TableRow key={id}>
                  <TableCell className={'text-center'}>{id}</TableCell>
                  <TableCell className={'text-center'}>
                    {
                      result.is_thanh_cong ? (
                        <span className={'text-green-500 font-medium'}>Success</span>
                      ) : (
                        <span className={'text-red-500 font-medium'}>Failed</span>
                      )
                    }
                  </TableCell>
                  <TableCell className={'max-w-[300px]'}>{result.thong_bao_loi}</TableCell>
                  <TableCell className={'flex items-center justify-center'}>
                    {
                      !result.is_thanh_cong && (
                        <TryAgainButton
                          id={id}
                          setCourseRegistrationMapping={setCourseRegistrationMapping}
                        />
                      )
                    }
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}
export default RegistrationResultTable
