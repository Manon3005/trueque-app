import { prisma } from "../config/db";
import { Denounced, Favorite, Product, State, Prisma, Image, User } from "../generated/prisma";
import { ImageBuffer } from "../models/image-buffer";

async function getAll(page: number, pageSize: number): Promise<(Product & { images: Image[] })[] | null> {
  return await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      images: true
    }
  });
}

async function searchAll(request: string, page: number, pageSize: number): Promise<(Product & { images: Image[] })[] | null> {
  return await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
        title: {
            contains: request,
        }
    },
    include: {
      images: true
    }
  });
}

async function getDenounced(page: number, pageSize: number): Promise<(Product & { _count: {denounced: number} })[] | null> {
  return await prisma.product.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      denounced: {
        some: {}
      }
    },
    include: {
      user: true,
      _count: {
        select: { denounced: true }
      }
    },
  });
}

async function get(id: number): Promise<Product & { images: Image[] } & { user: Partial<User>} | null> {
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

async function create(title: string, description: string, state: State, location: string, userId: number, images: ImageBuffer[]): Promise<Product | Prisma.PrismaClientKnownRequestError>   {
  return await prisma.product.create({
    data: {
        title: title,
        description: description,
        state: state,
        location: location,
        user_id: userId,

        images: {
          create: images.map((image) => ({ content: image.buffer, mime: image.mimeType })),
        },
    },
    include: {
        images: true,
    },
  });
}

async function update(id: number, title: string, description: string, state: State, location: string, images: ImageBuffer[]): Promise<Product | Prisma.PrismaClientKnownRequestError>   {
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
          create: images.map((image) => ({ content: image.buffer, mime: image.mimeType })),
        },
      },
      include: { images: true },
    });
}

async function getFromUser(userId: number): Promise<(Product & { images: Image[] })[] | null> {
    return await prisma.product.findMany({
        where: {
            user_id: userId
        },
        include: {
          images: true
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

async function countDenounced(): Promise<number> {
  return await prisma.product.count({
    where: {
      denounced: {
        some: {}
      }
    },
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
    isFavorite,
    getDenounced,
    countDenounced
}