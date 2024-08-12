from numba import cuda
import torch
device = cuda.get_current_device()

torch.cuda.empty_cache()