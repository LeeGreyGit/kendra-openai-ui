import * as React from "react";
import { ReactElement, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { HTTP_STATUS, KEY_CODE } from "../api/constants";
import { postKendraSearch, getFileData, postChatGpt } from "../api/callApi";
import TextField from "../common/input/TextField";
import { SIZE } from "../api/constants";
import useStyles from "../components/styles";
import SendIcon from "@material-ui/icons/Send";
import LoadingIcon from "../common/atoms/icon/LoadingIcon";
import {
  DataSearch,
  FileResponse,
  ResponseError,
  FileInfo,
  ChatbotProps,
  ChatBotHistory,
} from "../api/interface";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "../common/dialog/Dialog";
import { pdfjs, Document, Page } from "react-pdf";
import clsx from "clsx";
import { GlobalWorkerOptions } from "pdfjs-dist";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { ChangeEvent } from "react";
import { Icon } from "../common/icon/Icon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import chatBotIcon from "../common/icon/chatbotIcon.png";
import chatbot from "../common/icon/chatbot.png";
import { Paper, Typography } from "@material-ui/core";

// eslint-disable-next-line max-len
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const initSearchCondition = {
  queryText: "",
  sortData: "_created_at",
  sortOrder: "DESC",
  page: 1,
  size: SIZE.SIZE_10,
};

const options = [
  { label: "Created at", value: "_created_at" },
  { label: "Updated at", value: "_last_updated_at" },
  { label: "Category", value: "_category" },
  { label: "Data source", value: "_data_source_id" },
  { label: "Title", value: "_document_title" },
  { label: "_faq_id", value: "_faq_id" },
  { label: "File type", value: "_file_type" },
  { label: "Language code", value: "_language_code" },
  { label: "Tenant ID", value: "_tenant_id" },
  { label: "Version", value: "_version" },
  { label: "View count", value: "_view_count" },
];

const ChatbotContainer = (): ReactElement<ReactNode> => {
  return <Chatbot />;
};

export const Chatbot = (): ReactElement<ReactNode> => {
  const { t } = useTranslation();
  const [queryText, setQueryText] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<string>("DESC");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<DataSearch>();
  const [pageSize, setPageSize] = useState<{
    width: number;
    height: number;
  }>();
  const [openChatBot, setOpenChatBot] = useState<boolean>(false);
  const classes = useStyles({
    fileWidth: pageSize?.width,
    fileHeight: pageSize?.height,
    openChatBot: openChatBot,
  });
  const [selectedOption, setSelectedOption] = useState(options[0]?.value);

  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
    let newSortData = event.target.value as string;
    setSelectedOption(newSortData);
    const newSearchCondition = {
      ...searchCondition,
      sortData: newSortData,
    };
    setSearchCondition(newSearchCondition);
    handleAskClick(newSearchCondition);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const queryText = e.target.value;
    if (queryText == null || queryText === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setQueryText(queryText);
    setSearchCondition((prev: ChatbotProps) => ({
      ...prev,
      queryText: queryText,
    }));
  };

  const handleChangeSortOrder = (sortOrder: string): void => {
    setSortOrder(sortOrder);
    const newSearchCondition = {
      ...searchCondition,
      sortOrder: sortOrder,
    };
    setSearchCondition(newSearchCondition);
    handleAskClick(newSearchCondition);
  };
  const handleAskClick = async (
    searchCondition: ChatbotProps
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const { status, response } = await postKendraSearch(searchCondition);
      if (status === HTTP_STATUS.SUCCESS) {
        setResponse(response);
        setPage(response.paging.page);
        const newSearchCondition = {
          ...searchCondition,
          page: response.paging.page,
        };
        setSearchCondition(newSearchCondition);
      }
    } catch (error) {
      console.error("APIエラー:", error);
    }
    setIsLoading(false);
  };

  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [searchCondition, setSearchCondition] =
    useState<ChatbotProps>(initSearchCondition);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const loadPage = (pageNumber: number): void => {
    if (!loadedPages[pageNumber]) {
      setLoadedPages((prevLoadedPages) => ({
        ...prevLoadedPages,
        [pageNumber]: true,
      }));
    }
  };
  const goToPrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      loadPage(currentPage - 1);
    }
  };

  const goToNextPage = (): void => {
    if (numPages === null) {
      console.error("numPages is null. Unable to navigate to the next page.");
      return;
    }
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
      loadPage(currentPage + 1);
    }
  };

  const updatePageSize = (pageWidth: number, pageHeight: number): void => {
    setPageSize({ width: pageWidth, height: pageHeight });
  };

  const [updateDialogFileOpen, setUpdateDialogFileOpen] = useState(false);
  const [profileData, setProfileData] = useState<FileResponse>();

  const handleOpenNewTab = async (
    file: FileInfo
  ): Promise<void | ResponseError> => {
    window.open(file.fileUrl, "_blank");
  };
  const handleOpenDialogFile = async (
    file: FileInfo
  ): Promise<void | ResponseError> => {
    if (file?.filePath) {
      const {
        response,
        error,
      }: {
        response?: FileResponse;
        error?: ResponseError;
      } = await getFileData({ filePath: file.filePath });
      if (response) {
        setProfileData(response);
        setUpdateDialogFileOpen(true);
        return;
      }
      throw error;
    }
  };

  const handleCloseDialogFile = (): void => {
    setUpdateDialogFileOpen(false);
  };

  const handleDownloadFile = async (): Promise<void> => {
    if (profileData) {
      const reader = new FileReader();
      reader.onload = (): void => {
        const dataUri = reader.result as string;
        const a = document.createElement("a");
        a.download = decodeURIComponent(
          profileData.fileName.replace(/\+/g, " ")
        );
        a.href = dataUri;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      reader.onerror = (): void => {
        console.error("Error reading the file.");
      };
      reader.readAsDataURL(profileData.file);
    }
  };

  const clickDownloadFile = async (
    file: FileInfo
  ): Promise<void | ResponseError> => {
    if (file?.filePath) {
      const {
        response,
        error,
      }: {
        response?: FileResponse;
        error?: ResponseError;
      } = await getFileData({ filePath: file.filePath });
      if (response) {
        const reader = new FileReader();
        reader.onload = (): void => {
          const dataUri = reader.result as string;
          const a = document.createElement("a");
          a.download = decodeURIComponent(
            response.fileName.replace(/\+/g, " ")
          );
          a.href = dataUri;
          document.body.appendChild(a);
          a.click();
          a.remove();
        };
        reader.onerror = (): void => {
          console.error("Error reading the file.");
        };
        reader.readAsDataURL(response.file);
        return;
      }
      throw error;
    }
  };

  const [page, setPage] = useState<number>(1);
  const onPageChange = (page: number): void => {
    setPage(page);
    const newSearchCondition = {
      ...searchCondition,
      page: page,
    };
    setSearchCondition(newSearchCondition);
    handleAskClick(newSearchCondition);
  };

  const onSearch = async (): Promise<void> => {
    handleAskClick(searchCondition);
  };

  const [inputMessage, setInputMessage] = useState("");
  const [disabledChatbot, setDisabledChatbot] = useState<boolean>(true);
  const [chatHistory, setChatHistory] = useState<ChatBotHistory[]>([]);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const queryText = e.target.value;
    if (queryText == null || queryText === "") {
      setDisabledChatbot(true);
    } else {
      setDisabledChatbot(false);
    }
    setInputMessage(queryText);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputMessage.trim() === "") return;
    setIsLoadingChat(true);
    const newMessage = {
      user: inputMessage,
      bot: "",
    };
    setInputMessage("");
    setChatHistory([...chatHistory, newMessage]);
    try {
      const { status, response } = await postChatGpt({
        message: inputMessage,
      });
      if (status === HTTP_STATUS.SUCCESS) {
        const botReply = response.message;
        const newMessageReply = {
          user: inputMessage,
          bot: botReply,
        };
        setChatHistory([...chatHistory, newMessageReply]);
      }
      setIsLoadingChat(false);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const toggleChatbot = () => {
    setOpenChatBot(!openChatBot);
  };

  return (
    <div className={classes.chatbotRoot}>
      <div className={classes.title}>{t("title")}</div>
      <div>
        <TextField
          value={queryText}
          placeholder={t("inputText")}
          onChange={handlePromptChange}
          multiline={false}
          disabled={false}
          maxLength={SIZE.SIZE_2000}
          className={classes.inputText}
          InputProps={{
            endAdornment: (
              <Tooltip title={t("send")}>
                <SendIcon
                  onClick={disabled ? undefined : onSearch}
                  className={
                    disabled ? classes.sendIconDisabled : classes.sendIconActive
                  }
                />
              </Tooltip>
            ),
          }}
          onKeyDown={(e): void => {
            if (e.key === KEY_CODE.ENTER && !disabled) {
              onSearch();
            }
          }}
        />
      </div>
      <div className={classes.result}>
        {isLoading && <LoadingIcon />}
        {!isLoading && response && (
          <div className={classes.resultBody}>
            {response.paging.total > 0 ? (
              <>
                <div className={classes.pagination}>
                  <div className={classes.paginationLeft}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedOption}
                      label="Age"
                      onChange={handleSelectChange}
                      className={classes.selectedOption}
                    >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {sortOrder === "DESC" ? (
                      <Tooltip title={t("desc")}>
                        <ArrowDownwardIcon
                          className={classes.fileIcon}
                          onClick={() => handleChangeSortOrder("ASC")}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title={t("asc")}>
                        <ArrowUpwardIcon
                          className={classes.fileIcon}
                          onClick={() => handleChangeSortOrder("DESC")}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <div className={classes.paginationRight}>
                    {t("result", {
                      fromIndex: response.paging.fromIndex,
                      toIndex: response.paging.toIndex,
                      total: response.paging.total,
                    })}
                    <Pagination
                      count={Math.ceil(response.paging.total / SIZE.SIZE_10)}
                      color="primary"
                      onChange={(event, page) => onPageChange(page)}
                      page={page}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </div>
                {response.data &&
                  response.data.map((file, index) => (
                    <div key={index} className={classes.fileData}>
                      <div className={classes.fileName}>
                        {decodeURIComponent(file.fileName)}
                        <div className={classes.buttonlist}>
                          {file.fileName.toLowerCase().endsWith(".pdf") && (
                            <Tooltip title={t("preview")}>
                              <VisibilityIcon
                                className={classes.fileIcon}
                                onClick={() => handleOpenDialogFile(file)}
                              />
                            </Tooltip>
                          )}
                          <Tooltip title={t("download")}>
                            <GetAppIcon
                              onClick={() => clickDownloadFile(file)}
                              className={classes.fileIcon}
                            />
                          </Tooltip>
                        </div>
                      </div>
                      <div className={classes.fileBody}>{file.fileBody}</div>
                      <div
                        onClick={() => handleOpenNewTab(file)}
                        className={classes.fileUrl}
                      >
                        {decodeURIComponent(file.fileUrl)}
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className={classes.noData}>{t("noData")}</div>
            )}
          </div>
        )}
      </div>
      {updateDialogFileOpen && profileData && (
        <Dialog
          open={true}
          title={decodeURIComponent(profileData.fileName)}
          message={
            profileData && (
              <div>
                <Document
                  file={profileData.file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className={classes.pdfContainer}
                >
                  <Page
                    pageNumber={currentPage}
                    renderForms={false}
                    loading={false}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    pageIndex={currentPage}
                    className={classes.pdfPage}
                    width={pageSize?.width}
                    height={pageSize?.height}
                    onLoadSuccess={(page): void => {
                      updatePageSize(page.width, page.height);
                      loadPage(currentPage + 1);
                    }}
                  />
                </Document>
                <div className={classes.pdfNavigate}>
                  <NavigateBeforeIcon
                    onClick={goToPrevPage}
                    style={{
                      cursor: currentPage === 1 ? undefined : "pointer",
                      opacity: currentPage === 1 ? 0.5 : 1,
                    }}
                    className={clsx(classes.icon, {
                      [classes.disabledIcon]: currentPage === 1,
                    })}
                  />
                  {currentPage} {" / "} {numPages}
                  <NavigateNextIcon
                    onClick={goToNextPage}
                    style={{
                      cursor: currentPage === numPages ? undefined : "pointer",
                      opacity: currentPage === numPages ? 0.5 : 1,
                    }}
                    className={clsx(classes.icon, {
                      [classes.disabledIcon]: currentPage === numPages,
                    })}
                  />
                  <Tooltip title={t("download")}>
                    <GetAppIcon
                      onClick={handleDownloadFile}
                      className={classes.icon}
                    />
                  </Tooltip>
                </div>
              </div>
            )
          }
          onClose={handleCloseDialogFile}
          onCancel={handleCloseDialogFile}
        />
      )}
      <div className={classes.chatBot}>
        <Icon
          src={chatbot}
          className={classes.chatbotIcon}
          onClick={toggleChatbot}
          isTooltip={true}
        />
        {openChatBot && (
          <div className={classes.chatBotBody}>
            <div className={classes.chatBotHistory}>
              {chatHistory.map((message, index) => (
                <div key={index} className="message">
                  <div className={classes.userMessage}>
                    <Paper elevation={3} className={classes.balloonUser}>
                      <div className={classes.triangleUser} />
                      <Typography variant="body1" className={classes.message}>
                        {" "}
                        {message.user}
                      </Typography>
                    </Paper>
                    <AccountCircleIcon className={classes.userMessageIcon} />
                  </div>
                  <div className={classes.botMessage}>
                    <Icon
                      src={chatBotIcon}
                      className={classes.botMessageIcon}
                    />
                    {isLoadingChat && message.bot === "" ? (
                      <LoadingIcon />
                    ) : (
                      <Paper elevation={3} className={classes.balloonBot}>
                        <div className={classes.triangleBot} />
                        <Typography variant="body1" className={classes.message}>
                          {" "}
                          {message.bot}
                        </Typography>
                      </Paper>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.chatBotTextField}>
              <TextField
                value={inputMessage}
                placeholder={t("inputMsg")}
                onChange={handleInputChange}
                multiline={true}
                minRows={1}
                maxRows={10}
                disabled={false}
                maxLength={SIZE.SIZE_2000}
                className={classes.inputChatBot}
                InputProps={{
                  endAdornment: (
                    <Tooltip title={t("send")}>
                      <SendIcon
                        onClick={
                          disabledChatbot || isLoadingChat
                            ? undefined
                            : handleSubmit
                        }
                        className={
                          disabledChatbot || isLoadingChat
                            ? classes.sendIconDisabled
                            : classes.sendIconActive
                        }
                      />
                    </Tooltip>
                  ),
                }}
                onKeyDown={(e): void => {
                  if (
                    e.key === KEY_CODE.ENTER &&
                    !e.shiftKey &&
                    !disabledChatbot &&
                    !isLoadingChat
                  ) {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotContainer;
