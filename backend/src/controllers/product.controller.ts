import { Request, Response } from 'express';
import { jsonResponse } from '../models/json-response';
import { ProductRepository } from '../repositories/product.repository';
import { CreateProductDto, GetProductFromUserDto, GetProductRequestDto, UpdateIsDenouncedDto, UpdateIsFavoriteDto, UpdateProductDto } from '../dto/product.dto';

async function create(req: Request, res: Response) {
  try {
    const body = req.body as CreateProductDto;

    const product = await ProductRepository.create(body.title, body.description, body.state, body.location, body.user_id, body.images);
    const result: jsonResponse = {
        code: 200,
        message: "Product created successfully.",
        data: product
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in creating product.",
      data: null
    }
    res.json(result);
  }
};

async function update(req: Request, res: Response) {
  try {
    const body = req.body as UpdateProductDto;

    const product = await ProductRepository.update(parseInt(req.params.id), body.title, body.description, body.state, body.location, body.images);
    const result: jsonResponse = {
        code: 200,
        message: "Product updated successfully.",
        data: product
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.json(result);
  }
};

async function getAll(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    const products = await ProductRepository.getAll(page, pageSize);
    const amount = await ProductRepository.count();

    const result: jsonResponse = {
      code: 200,
      message: "Products sent successfully.",
      data: {
        users: products,
        totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
      }
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.json(result);
  }
}

async function getAllWithRequest(req: Request, res: Response) {
  try {
    const body = req.body as GetProductRequestDto;
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    const products = await ProductRepository.searchAll(body.request, page, pageSize);
    const amount = await ProductRepository.countRequest(body.request);

    const result: jsonResponse = {
      code: 200,
      message: "Products sent successfully.",
      data: {
        users: products,
        totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
      }
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.json(result);
  }
}

async function getAllFromUser(req: Request, res: Response) {
  try {
    const body = req.body as GetProductFromUserDto;
    const products = await ProductRepository.getFromUser(body.user_id);

    const result: jsonResponse = {
      code: 200,
      message: "Products sent successfully.",
      data: products
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting products.",
      data: null
    }
    res.json(result);
  }
}

async function updateIsDenounced(req: Request, res: Response) {
  try {
    const body = req.body as UpdateIsDenouncedDto;
    await ProductRepository.updateIsDenounced(parseInt(req.params.id), body.user_id, body.is_denounced);
    const result: jsonResponse = {
      code: 200,
      message: "Product updated successfully.",
      data: null
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.json(result);
  }
}

async function updateIsFavorite(req: Request, res: Response) {
  try {
    const body = req.body as UpdateIsFavoriteDto;
    await ProductRepository.updateIsFavorite(parseInt(req.params.id), body.user_id, body.is_favorite);
    const result: jsonResponse = {
      code: 200,
      message: "Product updated successfully.",
      data: null
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in updating product.",
      data: null
    }
    res.json(result);
  }
}

async function get(req: Request, res: Response) {
  try {
    const product = await ProductRepository.get(parseInt(req.params.id));

    const result: jsonResponse = {
      code: 200,
      message: "Product sent successfully.",
      data: product
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting product.",
      data: null
    }
    res.json(result);
  }
}

async function remove(req: Request, res: Response) {
  try {
    const product = await ProductRepository.remove(parseInt(req.params.id));
    const result: jsonResponse = {
      code: 200,
      message: "Product deleted successfully.",
      data: product
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in deleting product.",
      data: null
    }
    res.json(result);
  }
}

export const ProductController = {
  create,
  update,
  getAll,
  updateIsDenounced,
  getAllWithRequest,
  updateIsFavorite,
  get,
  remove,
  getAllFromUser
}