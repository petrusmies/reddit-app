import { useState } from 'react';

interface Props {
  code: string;
  state: string;
}

const Posts = () => {
  const [codeState, setCodeState] = useState<Props | { error: string; } | null>({ code: '', state: '' })
  
  return (
    <div>Posts</div>
  )
}

export default Posts