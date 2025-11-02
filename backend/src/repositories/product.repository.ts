import { prisma } from "../config/db";
import { Denounced, Favorite, Product, State, Prisma } from "../generated/prisma";

async function getAll(page: number, pageSize: number): Promise<Product[] | null> {
  return await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize
  });
}

async function searchAll(request: string, page: number, pageSize: number): Promise<Product[] | null> {
  return await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
        title: {
            contains: request,
        }
    }
  });
}

async function get(id: number): Promise<Product | null> {
  return await prisma.product.findUnique({
    where: {
        id: id
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          is_suspended: true
        },
      },
      images: true
    }
  });
}

async function updateIsFavorite(id: number, userId: number, isFavorite: boolean): Promise<Favorite | null> {
  if (isFavorite) {
    return await prisma.favorite.create({
        data: {
            product_id: id,
            user_id: userId
        }
    })
  } else {
    return await prisma.favorite.delete({
        where: {
            user_id_product_id: {
                product_id: id,
                user_id: userId
            }
        }
    });
  }
};

async function updateIsDenounced(id: number, userId: number, isDenounced: boolean): Promise<Denounced | null> {
  if (isDenounced) {
    return await prisma.denounced.create({
        data: {
            product_id: id,
            user_id: userId
        }
    });
  } else {
    return await prisma.denounced.delete({
        where: {
            user_id_product_id: {
                product_id: id,
                user_id: userId
            }
        }
    });
  }
};

async function remove(id: number): Promise<Product | null> {
    return await prisma.product.delete({
        where: {
            id: id
        }
    });
}

async function create(title: string, description: string, state: State, location: string, userId: number, images: Buffer[]): Promise<Product | Prisma.PrismaClientKnownRequestError>   {
  return await prisma.product.create({
    data: {
        title: title,
        description: description,
        state: state,
        location: location,
        user_id: userId,

        images: {
          create: images.map((imgContent) => ({ content: imgContent })),
        },
    },
    include: {
        images: true,
    },
  });
}

async function update(id: number, title: string, description: string, state: State, location: string, images: Buffer[]): Promise<Product | Prisma.PrismaClientKnownRequestError>   {
    await prisma.image.deleteMany({
        where: {
            product_id: id
        }
    })

    return await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        state,
        location,

        images: {
          create: images.map((imgContent) => ({ content: imgContent })),
        },
      },
      include: { images: true },
    });
}

async function getFromUser(userId: number): Promise<Product[] | null> {
    return await prisma.product.findMany({
        where: {
            user_id: userId
        }
    });
}

async function count(): Promise<number> {
  return await prisma.product.count();
}

async function countRequest(request: string): Promise<number> {
  return await prisma.product.count({
    where: {
        title: {
            contains: request,
        }
    }
  });
}

async function getFavorite(userId: number) {
  return await prisma.product.findMany({
    where: {
      favorites: {
        some: { user_id: userId }
      }
    },
    include: {
      images: true,
      user: true
    },
  });
}

async function isFavorite(productId: number, userId: number) {
  return await prisma.favorite.findUnique({
    where: {
      user_id_product_id: {
        user_id: userId,
        product_id: productId
      }
    },
  });
}


export const ProductRepository = {
    getAll,
    searchAll,
    get,
    updateIsFavorite,
    updateIsDenounced,
    remove,
    create,
    update,
    getFromUser,
    count,
    countRequest,
    getFavorite,
    isFavorite
}