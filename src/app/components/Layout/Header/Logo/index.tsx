import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href='/'>
      <div>
        <Image
          src={'/images/logo/logo.png'}
          alt='dsign-logo'
          width={130}
          height={64}
        />
      </div>
    </Link>
  )
}

export default Logo
