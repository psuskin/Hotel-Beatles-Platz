import { motion } from "framer-motion";
import Image from "next/image";

const diningOptions = [
  {
    title: "Breakfast",
    description:
      "Choose from fresh bread, baked goods, muesli, fruit, sausage and cheese as well as vegetarian salads from the breakfast buffet.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Private Dining",
    description:
      "The HOTEL AM BEATLES PLATZ Lounge is perfect for private events such as celebrations, lectures and private dining.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Snacks",
    description:
      "For the small hunger in between, there are delicious snacks from the snack menu at Yakshi Bar.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
];

const DiningCard = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const cardChildrenVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-light text-white mb-16 text-left uppercase max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Eat well at HOTEL AM BEATLES PLATZ
        </motion.h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {diningOptions.map((option, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div
                className="relative h-64"
                variants={cardChildrenVariants}
              >
                <Image
                  src={option.image}
                  alt={option.title}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
              <div className="p-6">
                <motion.h3
                  className="text-2xl font-semibold text-secondary-color mb-2"
                  variants={cardChildrenVariants}
                >
                  {option.title}
                </motion.h3>
                <motion.p
                  className="text-gray-300 mb-4 text-sm"
                  variants={cardChildrenVariants}
                >
                  {option.description}
                </motion.p>
                <motion.button
                  className="w-full bg-secondary-color text-gray-900 font-bold py-2 px-4 rounded transition-colors duration-300"
                  variants={cardChildrenVariants}
                >
                  LEARN MORE
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiningCard;
