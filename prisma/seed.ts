import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: 'Computer Science' },
      update: {},
      create: {
        name: 'Computer Science',
        description: 'Books related to programming, algorithms, and software development'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Engineering' },
      update: {},
      create: {
        name: 'Engineering',
        description: 'Books related to various engineering disciplines'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Mathematics' },
      update: {},
      create: {
        name: 'Mathematics',
        description: 'Books on pure and applied mathematics'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Physics' },
      update: {},
      create: {
        name: 'Physics',
        description: 'Books on classical and modern physics'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Literature' },
      update: {},
      create: {
        name: 'Literature',
        description: 'Fiction, poetry, and literary works'
      }
    }),
    prisma.category.upsert({
      where: { name: 'Management' },
      update: {},
      create: {
        name: 'Management',
        description: 'Books on business management and entrepreneurship'
      }
    })
  ])

  console.log(`Created ${categories.length} categories`)

  // Create books
  const books = [
    {
      isbn: '978-0134685991',
      title: 'Effective Java',
      author: 'Joshua Bloch',
      edition: '3rd',
      publisher: 'Addison-Wesley',
      publishedYear: 2017,
      quantity: 5,
      available: 5,
      rackNo: 'CS-101',
      categoryId: categories[0].id,
      description: 'A comprehensive guide to Java programming best practices'
    },
    {
      isbn: '978-0262033848',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      edition: '3rd',
      publisher: 'MIT Press',
      publishedYear: 2009,
      quantity: 8,
      available: 6,
      rackNo: 'CS-102',
      categoryId: categories[0].id,
      description: 'The definitive introduction to algorithm design and analysis'
    },
    {
      isbn: '978-0131103627',
      title: 'The C Programming Language',
      author: 'Brian W. Kernighan',
      edition: '2nd',
      publisher: 'Prentice Hall',
      publishedYear: 1988,
      quantity: 10,
      available: 8,
      rackNo: 'CS-103',
      categoryId: categories[0].id,
      description: 'The classic introduction to C programming'
    },
    {
      isbn: '978-0596007126',
      title: 'Head First Design Patterns',
      author: 'Eric Freeman',
      edition: '1st',
      publisher: "O'Reilly Media",
      publishedYear: 2004,
      quantity: 6,
      available: 6,
      rackNo: 'CS-104',
      categoryId: categories[0].id,
      description: 'A brain-friendly guide to design patterns'
    },
    {
      isbn: '978-0201633610',
      title: 'Design Patterns',
      author: 'Erich Gamma',
      edition: '1st',
      publisher: 'Addison-Wesley',
      publishedYear: 1994,
      quantity: 4,
      available: 4,
      rackNo: 'CS-105',
      categoryId: categories[0].id,
      description: 'Elements of Reusable Object-Oriented Software'
    },
    {
      isbn: '978-0073383095',
      title: 'Mechanical Engineering Design',
      author: 'Shigley',
      edition: '10th',
      publisher: 'McGraw-Hill',
      publishedYear: 2014,
      quantity: 5,
      available: 5,
      rackNo: 'ME-101',
      categoryId: categories[1].id,
      description: 'Comprehensive guide to mechanical engineering design'
    },
    {
      isbn: '978-0073529267',
      title: 'Engineering Mechanics: Statics',
      author: 'J.L. Meriam',
      edition: '7th',
      publisher: 'Wiley',
      publishedYear: 2011,
      quantity: 6,
      available: 6,
      rackNo: 'ME-102',
      categoryId: categories[1].id,
      description: 'Fundamentals of static mechanics'
    },
    {
      isbn: '978-0470458365',
      title: 'Advanced Engineering Mathematics',
      author: 'Erwin Kreyszig',
      edition: '10th',
      publisher: 'Wiley',
      publishedYear: 2011,
      quantity: 7,
      available: 7,
      rackNo: 'MATH-101',
      categoryId: categories[2].id,
      description: 'Comprehensive mathematics for engineers'
    },
    {
      isbn: '978-0073529281',
      title: 'Engineering Mechanics: Dynamics',
      author: 'J.L. Meriam',
      edition: '7th',
      publisher: 'Wiley',
      publishedYear: 2012,
      quantity: 5,
      available: 5,
      rackNo: 'ME-103',
      categoryId: categories[1].id,
      description: 'Fundamentals of dynamics in mechanics'
    },
    {
      isbn: '978-0716710883',
      title: 'The Feynman Lectures on Physics',
      author: 'Richard Feynman',
      edition: '2nd',
      publisher: 'Addison-Wesley',
      publishedYear: 2005,
      quantity: 4,
      available: 4,
      rackNo: 'PHY-101',
      categoryId: categories[3].id,
      description: 'The classic physics lectures by Richard Feynman'
    },
    {
      isbn: '978-0132350884',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      edition: '1st',
      publisher: 'Prentice Hall',
      publishedYear: 2008,
      quantity: 6,
      available: 6,
      rackNo: 'CS-106',
      categoryId: categories[0].id,
      description: 'A handbook of agile software craftsmanship'
    },
    {
      isbn: '978-0321125217',
      title: 'Refactoring',
      author: 'Martin Fowler',
      edition: '2nd',
      publisher: 'Addison-Wesley',
      publishedYear: 2019,
      quantity: 5,
      available: 5,
      rackNo: 'CS-107',
      categoryId: categories[0].id,
      description: 'Improving the design of existing code'
    },
    {
      isbn: '978-0061122415',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      edition: '1st',
      publisher: 'Harper Perennial',
      publishedYear: 2006,
      quantity: 3,
      available: 3,
      rackNo: 'LIT-101',
      categoryId: categories[4].id,
      description: 'A classic American novel'
    },
    {
      isbn: '978-0451524935',
      title: '1984',
      author: 'George Orwell',
      edition: '1st',
      publisher: 'Signet Classic',
      publishedYear: 1950,
      quantity: 4,
      available: 4,
      rackNo: 'LIT-102',
      categoryId: categories[4].id,
      description: 'A dystopian social science fiction novel'
    },
    {
      isbn: '978-1422124696',
      title: 'The Lean Startup',
      author: 'Eric Ries',
      edition: '1st',
      publisher: 'Currency',
      publishedYear: 2011,
      quantity: 5,
      available: 5,
      rackNo: 'MGMT-101',
      categoryId: categories[5].id,
      description: 'How Today\'s Entrepreneurs Use Continuous Innovation'
    }
  ]

  const createdBooks = await Promise.all(
    books.map(book =>
      prisma.book.upsert({
        where: { isbn: book.isbn },
        update: {},
        create: book
      })
    )
  )

  console.log(`Created ${createdBooks.length} books`)

  // Create sample users
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@clms.edu' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@clms.edu',
      password: hashedPassword,
      role: 'ADMIN'
    }
  })

  const librarian = await prisma.user.upsert({
    where: { email: 'librarian@clms.edu' },
    update: {},
    create: {
      name: 'John Librarian',
      email: 'librarian@clms.edu',
      password: hashedPassword,
      role: 'LIBRARIAN'
    }
  })

  const student = await prisma.user.upsert({
    where: { email: 'student@clms.edu' },
    update: {},
    create: {
      name: 'Jane Student',
      email: 'student@clms.edu',
      password: hashedPassword,
      role: 'STUDENT',
      branch: 'CSE',
      year: 3,
      semester: 5
    }
  })

  const faculty = await prisma.user.upsert({
    where: { email: 'faculty@clms.edu' },
    update: {},
    create: {
      name: 'Dr. Smith',
      email: 'faculty@clms.edu',
      password: hashedPassword,
      role: 'FACULTY',
      branch: 'CSE'
    }
  })

  console.log(`Created sample users`)
  // console.log('Admin: admin@clms.edu / password123')
  // console.log('Librarian: librarian@clms.edu / password123')
  // console.log('Student: student@clms.edu / password123')
  // console.log('Faculty: faculty@clms.edu / password123')

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
