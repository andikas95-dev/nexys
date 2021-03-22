import React, { useEffect, useState } from 'react'
import dynamic from 'next/dist/next-server/lib/dynamic'
import getSourceCode from 'components/CodeViewer/getSourceCode'
import Content from 'components/Content/Content'
import CodeViewer from 'components/CodeViewer/CodeViewer'

export async function getServerSideProps(ctx) {
  const { folder, file } = ctx.query

  const sourceCode = getSourceCode(`examples/${folder}/${file}.tsx`)

  return {
    props: {
      folder,
      file,
      sourceCode,
    },
  }
}

interface FileProps {
  folder: string
  file: string
  sourceCode: string
}

function File(props: FileProps) {
  const { folder, file, sourceCode } = props
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    const BasicInput = dynamic(() => import(`examples/${folder}/${file}`))
    setComponent(BasicInput)
  }, [])

  return (
    <React.Fragment>
      <Content style={{ paddingBottom: 10 }}>
        {Component && <Component />}
      </Content>
      <Content>{sourceCode && <CodeViewer text={sourceCode} />}</Content>
    </React.Fragment>
  )
}

export default File
