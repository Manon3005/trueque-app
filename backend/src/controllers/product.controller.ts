import { Request, Response } from 'express';
import { JsonResponse } from '../models/json-response';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto, GetProductRequestDto, UpdateIsDenouncedDto, UpdateIsFavoriteDto, UpdateProductDto } from '../dto/product.dto';
import { AuthenticatedRequest } from '../models/authenticated-request';
import { ImageBuffer } from '../models/image-buffer';
import { toBase64 } from '../utils/image';

async function create(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req.body as CreateProductDto;
    const files = req.files as Express.Multer.File[];

    let images: ImageBuffer[] = [];
    files.forEach(file => images.push({
      buffer: file.buffer,
      mimeType: file.mimetype
    }));

    const product = await ProductRepository.create(
      body.title, 
      body.description, 
      body.state, 
      body.location, 
      req.userId!, 
      images
    );

    const result: JsonResponse = {
        code: 200,
        message: "Product created successfully.",
        data: product
    }
    res.status(200).json(result);
  } catch (error) {

    console.error("Fallo en la creacion de producto!!", error);

    const result: JsonResponse = {
      code: 400,
      message: "Error in creating product.",
      data: null
    }
    res.status(400).json(result);
  }
};

async function update(req: Request, res: Response) {
  try {
    const body = req.body as UpdateProductDto;
    const files = req.files as Express.Multer.File[];

    let images: ImageBuffer[] = [];
    files.forEach(file => images.push({
      buffer: file.buffer,
      mimeType: file.mimetype
    }));

    const product = await ProductRepository.update(parseInt(req.params.id), body.title, body.description, body.state, body.location, images);
    const result: JsonResponse = {
        code: 200,
        message: "Product updated successfully.",
        data: product
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Fallo en la creacion de producto!!", error);
    const result: JsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.status(400).json(result);
  }
};

async function getAll(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);

    let products, amount;
    if (req.query.request) {
      const request = req.query.request as string;
      products = await ProductRepository.searchAll(request, page, pageSize);
      amount = await ProductRepository.countRequest(request);
    } else {
      products = await ProductRepository.getAll(page, pageSize);
      amount = await ProductRepository.count();
    }

    let result: JsonResponse;
    if (products != null) {
      const formattedProducts = products.map(product => {
        const image = product.images[0];
        const base64 = toBase64(image.content);
        const dataUrl = base64 ? `data:${image.mime ?? "image/png"};base64,${base64}` : null;

        return {
          ...product,
          images: [dataUrl]
        };
      });

      result = {
        code: 200,
        message: "Products sent successfully.",
        data: {
          products: formattedProducts,
          totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
        }
      }
    } else {
      result = {
        code: 200,
        message: "No product to sent.",
        data: {
          products: [],
          totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
        }
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function getAllFromUser(req: AuthenticatedRequest, res: Response) {
  try {
    const products = await ProductRepository.getFromUser(req.userId!);

    let result: JsonResponse;
    if (products != null) {
      const formattedProducts = products.map(product => {
        const image = product.images[0];
        const base64 = toBase64(image.content);
        const dataUrl = base64 ? `data:${image.mime ?? "image/png"};base64,${base64}` : null;

        return {
          ...product,
          images: [dataUrl]
        };
      });

      result = {
        code: 200,
        message: "Products sent successfully.",
        data: formattedProducts,
      }
    } else {
      result = {
        code: 200,
        message: "No product to sent.",
        data: [],
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function updateIsDenounced(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req.body as UpdateIsDenouncedDto;
    await ProductRepository.updateIsDenounced(parseInt(req.params.id), req.userId!, body.is_denounced);
    const result: JsonResponse = {
      code: 200,
      message: "Product updated successfully.",
      data: null
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function updateIsFavorite(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req.body as UpdateIsFavoriteDto;
    await ProductRepository.updateIsFavorite(parseInt(req.params.id), req.userId!, body.is_favorite);
    const result: JsonResponse = {
      code: 200,
      message: "Product updated successfully.",
      data: null
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function get(req: AuthenticatedRequest, res: Response) {
  try {
    const product = await ProductRepository.get(parseInt(req.params.id));

    const images = product!.images.map((image) => {
      const base64 = toBase64(image.content);
      const dataUrl = base64 ? `data:${image.mime ?? "image/png"};base64,${base64}` : null;
      return dataUrl;
    })

    const isFavorite = (await ProductRepository.isFavorite(parseInt(req.params.id), req.userId!) == null) ? false: true;

    const result: JsonResponse = {
      code: 200,
      message: "Product sent successfully.",
      data: {
        ...product,
        isFavorite: isFavorite,
        images: images,
        user: product?.user.username
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting product.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const product = await ProductRepository.remove(parseInt(req.params.id));
    const result: JsonResponse = {
      code: 200,
      message: "Product deleted successfully.",
      data: product
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in deleting product.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function getUserFavorite(req: AuthenticatedRequest, res: Response) {
  try {
    const products = await ProductRepository.getFavorite(req.userId!);

    let result: JsonResponse;
    if (products != null) {
      const formattedProducts = products.map(product => {
        const image = product.images[0];
        const base64 = toBase64(image.content);
        const dataUrl = base64 ? `data:${image.mime ?? "image/png"};base64,${base64}` : null;

        return {
          ...product,
          images: [dataUrl]
        };
      });

      result = {
        code: 200,
        message: "Products sent successfully.",
        data: formattedProducts,
      }
    } else {
      result = {
        code: 200,
        message: "No product to sent.",
        data: [],
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.status(400).json(result);
  }
}

export const ProductController = {
  create,
  update,
  getAll,
  updateIsDenounced,
  updateIsFavorite,
  get,
  remove,
  getAllFromUser,
  getUserFavorite
}