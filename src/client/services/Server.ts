import type { BridgeStatusResponseDTO } from "../models/BridgeStatusResponseDTO";
import type { GasPriceResponseDTO } from "../models/GasPriceResponseDTO";
import type { HealthResponseDTO } from "../models/HealthResponseDTO";
import type { SingleTxDTO } from "../models/SingleTxDTO";
import type { SingleTxOutputDTO } from "../models/SingleTxOutputDTO";
import type { TokenPriceResponseDTO } from "../models/TokenPriceResponseDTO";
import type { TransactionReceiptResponseDTO } from "../models/TransactionReceiptResponseDTO";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BridgeName } from "../models/BridgeDetails";
import { ChainId } from "../models/ChainId";

export class Server {
  /**
   * @returns HealthResponseDTO Health Check for Fund Movr API
   * @throws ApiError
   */
  public static getHealth(): CancelablePromise<HealthResponseDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/health",
    });
  }

  /**
   * @returns any Health Check for Fund Movr API RPCS
   * @throws ApiError
   */
  public static getHealthRpc(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/health-rpc",
    });
  }

  /**
   * @returns GasPriceResponseDTO Current gas prices for a chain
   * @throws ApiError
   */
  public static getGasPrice({
    chainId,
  }: {
    /** ID of chain, e.g Ethereum Mainnet = 1 **/
    chainId: ChainId;
  }): CancelablePromise<GasPriceResponseDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/gas-price",
      query: {
        chainId: chainId,
      },
    });
  }

  /**
   * @returns TokenPriceResponseDTO Returns price of token for a given chain
   * @throws ApiError
   */
  public static getTokenPrice({
    tokenAddress,
    chainId,
  }: {
    /** Token contract address on network, e.g USDC on Ethereum Mainnet **/
    tokenAddress: string;
    /** ID of chain, e.g Ethereum Mainnet = 1 **/
    chainId: ChainId;
  }): CancelablePromise<TokenPriceResponseDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/token-price",
      query: {
        tokenAddress: tokenAddress,
        chainId: chainId,
      },
    });
  }

  /**
   * @returns SingleTxOutputDTO Get the tx details for the route.
   * @returns any
   * @throws ApiError
   */
  public static getSingleTx({
    requestBody,
  }: {
    requestBody: SingleTxDTO;
  }): CancelablePromise<SingleTxOutputDTO> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v2/build-tx",
      headers: {
        "API-KEY": OpenAPI.API_KEY,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @returns BridgeStatusResponseDTO Returns the status of the bridging transaction if completed or pending.
   * @throws ApiError
   */
  public static getBridgingStatus({
    transactionHash,
    fromChainId,
    toChainId,
    bridgeName,
  }: {
    /** Transaction hash originating from the source chain while bridging assets. **/
    transactionHash: string;
    /** ID of source chain, e.g Ethereum Mainnet = 1 **/
    fromChainId: number;
    /** ID of destination chain, e.g Ethereum Mainnet = 1 **/
    toChainId: number;
    /** Name of the bridge used while bridging. **/
    bridgeName?: BridgeName;
  }): CancelablePromise<BridgeStatusResponseDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/bridge-status",
      headers: {
        "API-KEY": OpenAPI.API_KEY,
      },
      query: {
        transactionHash: transactionHash,
        fromChainId: fromChainId,
        toChainId: toChainId,
        bridgeName: bridgeName,
      },
    });
  }

  /**
   * @returns TransactionReceiptResponseDTO Returns the receipt of the transaction.
   * @throws ApiError
   */
  public static getTransactionReceipt({
    transactionHash,
    chainId,
  }: {
    /** Transaction hash originating from the source chain while bridging assets. **/
    transactionHash: string;
    /** ID of source chain, e.g Ethereum Mainnet = 1 **/
    chainId: ChainId;
  }): CancelablePromise<TransactionReceiptResponseDTO> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v2/tx-receipt",
      headers: {
        "API-KEY": OpenAPI.API_KEY,
      },
      query: {
        transactionHash: transactionHash,
        chainId: chainId,
      },
    });
  }
}
